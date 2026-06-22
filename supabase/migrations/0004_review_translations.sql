-- Per-language review translations + auto-translate pipeline.
-- Builds on 0002 (reviews table). Auth model matches 0002:
--   anon = read PUBLISHED content only; authenticated admins = full control.
--
-- New review insert → trigger → pg_net.http_post → Edge Function
-- "translate-review" fills review_translations for the 3 non-source languages.
-- The original-language text is also stored as a translation row (is_machine=false)
-- so the public page can always read from review_translations uniformly.

-- ─── reviews: new columns ──────────────────────────────────────────────────────
-- source_lang : detected/declared original language (tr|en|fr|ru). Defaults to 'en'
--               because most Google reviews are foreign-language; admin can fix.
-- external_id : dedupe key from the Maps scrape so a re-scrape never double-inserts.
-- review_date / author_country : optional metadata captured by the scraper.
alter table public.reviews
  add column if not exists source_lang    text not null default 'en'
    check (source_lang in ('tr','en','fr','ru')),
  add column if not exists external_id     text,
  add column if not exists review_date     date,
  add column if not exists author_country  text;

create unique index if not exists reviews_external_id_uidx
  on public.reviews (external_id)
  where external_id is not null;

-- ─── review_translations ───────────────────────────────────────────────────────
create table if not exists public.review_translations (
  id          uuid primary key default gen_random_uuid(),
  review_id   uuid not null references public.reviews (id) on delete cascade,
  lang        text not null check (lang in ('tr','en','fr','ru')),
  body        text not null,
  -- true = machine translation (safe to overwrite on re-translate);
  -- false = admin-edited or original-language source (never overwritten).
  is_machine  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (review_id, lang)
);

alter table public.review_translations enable row level security;

drop policy if exists "anon read published review translations" on public.review_translations;
drop policy if exists "auth all review translations" on public.review_translations;

-- Anon may read a translation only when its parent review is published.
create policy "anon read published review translations" on public.review_translations
  for select to anon
  using (
    exists (
      select 1 from public.reviews r
      where r.id = review_translations.review_id
        and r.status = 'published'
    )
  );

create policy "auth all review translations" on public.review_translations
  for all to authenticated using (true) with check (true);

create index if not exists review_translations_review_idx
  on public.review_translations (review_id);

-- ─── auto-translate trigger ────────────────────────────────────────────────────
-- Requires pg_net for outbound HTTP from Postgres.
create extension if not exists pg_net with schema extensions;

-- Edge Function URL + shared secret are read from Vault, NOT hardcoded.
-- Setup (run once, see scripts/README.md):
--   select vault.create_secret('https://<ref>.supabase.co/functions/v1/translate-review', 'edge_translate_url');
--   select vault.create_secret('<random-shared-secret>', 'edge_shared_secret');
-- The same secret must be set on the function: supabase secrets set EDGE_SHARED_SECRET=<...>
create or replace function public.fn_enqueue_review_translation()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  fn_url     text;
  fn_secret  text;
begin
  select decrypted_secret into fn_url
    from vault.decrypted_secrets where name = 'edge_translate_url';
  select decrypted_secret into fn_secret
    from vault.decrypted_secrets where name = 'edge_shared_secret';

  -- If the pipeline isn't configured yet, insert still succeeds (no-op).
  if fn_url is null then
    return new;
  end if;

  perform net.http_post(
    url     := fn_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-shared-secret', coalesce(fn_secret, '')
    ),
    body    := jsonb_build_object('review_id', new.id)
  );
  return new;
end;
$$;

drop trigger if exists trg_review_translate on public.reviews;
create trigger trg_review_translate
  after insert on public.reviews
  for each row
  execute function public.fn_enqueue_review_translation();
