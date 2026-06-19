-- Admin-managed content: revision requests, blog posts, reviews + image storage.
-- Auth model (matches 0001): anonymous visitors get read-only access to PUBLISHED
-- content; only authenticated admins (Supabase Auth users) can write/manage.
-- Create the admin user in Supabase Dashboard → Authentication → Users.

-- ─── revision_requests ────────────────────────────────────────────────────────
-- Internal change requests (Kimsin / Revizyon isteği / Aciliyet 1-10).
-- Admin-only: no anon access at all (managed entirely inside /admin).
create table if not exists public.revision_requests (
  id          uuid primary key default gen_random_uuid(),
  requester   text not null,                                   -- "Kimsin?"
  body        text not null,                                   -- "Revizyon isteğin nedir?"
  urgency     smallint not null check (urgency between 1 and 10),
  status      text not null default 'open' check (status in ('open','progress','done')),
  created_at  timestamptz not null default now()
);
alter table public.revision_requests enable row level security;

drop policy if exists "anon insert rev" on public.revision_requests;
drop policy if exists "anon select rev" on public.revision_requests;
drop policy if exists "anon update rev" on public.revision_requests;
drop policy if exists "anon delete rev" on public.revision_requests;
drop policy if exists "auth all rev" on public.revision_requests;

create policy "auth all rev" on public.revision_requests
  for all to authenticated using (true) with check (true);

create index if not exists revision_requests_created_at_idx
  on public.revision_requests (created_at desc);

-- ─── blog_posts ───────────────────────────────────────────────────────────────
-- Public reads PUBLISHED posts; admin manages everything (drafts included).
create table if not exists public.blog_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  content_html    text not null,
  cover_image_url text,
  excerpt         text,
  published       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table public.blog_posts enable row level security;

drop policy if exists "public read published" on public.blog_posts;
drop policy if exists "anon full blog" on public.blog_posts;
drop policy if exists "anon read published" on public.blog_posts;
drop policy if exists "anon insert blog" on public.blog_posts;
drop policy if exists "anon update blog" on public.blog_posts;
drop policy if exists "anon delete blog" on public.blog_posts;
drop policy if exists "anon read published blog" on public.blog_posts;
drop policy if exists "auth all blog" on public.blog_posts;

create policy "anon read published blog" on public.blog_posts
  for select to anon using (published = true);
create policy "auth all blog" on public.blog_posts
  for all to authenticated using (true) with check (true);

create index if not exists blog_posts_created_at_idx
  on public.blog_posts (created_at desc);

-- ─── reviews ──────────────────────────────────────────────────────────────────
-- Public reads PUBLISHED reviews (homepage marquee); admin manages everything.
create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  author        text not null,
  rating        smallint not null default 5 check (rating between 1 and 5),
  body          text not null,
  source_label  text,
  status        text not null default 'published' check (status in ('published','archived')),
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);
alter table public.reviews enable row level security;

drop policy if exists "anon read published reviews" on public.reviews;
drop policy if exists "anon insert reviews" on public.reviews;
drop policy if exists "anon update reviews" on public.reviews;
drop policy if exists "anon delete reviews" on public.reviews;
drop policy if exists "auth all reviews" on public.reviews;

create policy "anon read published reviews" on public.reviews
  for select to anon using (status = 'published');
create policy "auth all reviews" on public.reviews
  for all to authenticated using (true) with check (true);

create index if not exists reviews_sort_idx
  on public.reviews (sort_order asc, created_at desc);

-- ─── blog-images storage bucket ────────────────────────────────────────────────
-- Public read (cover + inline images); only authenticated admins upload/delete.
insert into storage.buckets (id, name, public)
values ('blog-images','blog-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public read blog images" on storage.objects;
drop policy if exists "anon upload blog images" on storage.objects;
drop policy if exists "anon update blog images" on storage.objects;
drop policy if exists "anon delete blog images" on storage.objects;
drop policy if exists "auth write blog images" on storage.objects;

create policy "public read blog images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'blog-images');
create policy "auth write blog images" on storage.objects
  for all to authenticated using (bucket_id = 'blog-images') with check (bucket_id = 'blog-images');
