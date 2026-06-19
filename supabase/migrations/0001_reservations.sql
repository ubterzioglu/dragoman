-- Reservation requests submitted from the public site.
-- Anonymous visitors may INSERT; only authenticated admins may read/update.

create table if not exists public.reservation_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  tour_slug   text,
  date        date,
  party_size  int,
  name        text not null,
  email       text,
  phone       text not null,
  message     text,
  lang        text,
  status      text not null default 'new'  -- new | contacted | confirmed | done | cancelled
);

alter table public.reservation_requests enable row level security;

-- Public form can create requests.
drop policy if exists "anon insert reservations" on public.reservation_requests;
create policy "anon insert reservations"
  on public.reservation_requests for insert
  to anon, authenticated
  with check (true);

-- Only signed-in admins can read.
drop policy if exists "auth read reservations" on public.reservation_requests;
create policy "auth read reservations"
  on public.reservation_requests for select
  to authenticated
  using (true);

-- Only signed-in admins can update status.
drop policy if exists "auth update reservations" on public.reservation_requests;
create policy "auth update reservations"
  on public.reservation_requests for update
  to authenticated
  using (true)
  with check (true);

create index if not exists reservation_requests_created_at_idx
  on public.reservation_requests (created_at desc);
