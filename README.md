# Dragoman Diving & Outdoors

Multilingual (TR / EN / FR) marketing & reservation-request site for Dragoman
Diving & Outdoors in Kaş, Antalya — scuba diving (SSI center), guided Kekova sea
kayak tours, and outdoor activities. Built with React + Vite + TypeScript +
Tailwind, deployed as a static SPA via Docker/nginx on [Coolify](https://coolify.io).

## Tech stack

- **React 18 + Vite 5 + TypeScript** (SPA)
- **Tailwind CSS** + shadcn-style UI primitives + lucide-react + framer-motion
- **react-router-dom 7** with locale-prefixed routes (`/:lang/...`)
- **react-i18next** (TR default, EN, FR) + **react-helmet-async** (per-route SEO/hreflang/JSON-LD)
- **react-hook-form + zod** reservation form → **Supabase** insert + WhatsApp deep link
- **@supabase/supabase-js** (reservations + admin auth)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck + production build to dist/
npm run preview      # serve the built dist/
npm test             # vitest unit tests
```

Create `.env.local` (gitignored) for Supabase:

```
VITE_SUPABASE_URL="https://<project>.supabase.co"
VITE_SUPABASE_ANON_KEY="<anon-key>"
```

Only the **anon** (public) key belongs on the client. The `service_role` key must
never be exposed with a `VITE_` prefix.

## Database

Apply `supabase/migrations/0001_reservations.sql` to create the
`reservation_requests` table with RLS (anon insert, authenticated read/update).
Create one admin user in Supabase Auth to access `/admin`.

## Routes

- `/:lang` home · `/:lang/turlar` tours · `/:lang/turlar/:slug` tour detail
- `/:lang/ozel-turlar` · `/:lang/hakkimizda` · `/:lang/galeri` · `/:lang/yorumlar`
  · `/:lang/iletisim` · `/:lang/sss`
- `/admin` Supabase-backed reservations panel

## Deploy on Coolify (Docker)

```bash
docker build -t dmseakayak .
docker run -p 8080:80 \
  -e VITE_SUPABASE_URL="..." -e VITE_SUPABASE_ANON_KEY="..." \
  dmseakayak                      # http://localhost:8080
```

The image is a multi-stage build (`node:22-alpine` → `nginx:1.27-alpine`).
`docker-entrypoint-env.sh` writes `/env-config.js` at startup so Supabase public
vars can be set at deploy time without rebuilding. In Coolify: Build Pack =
Dockerfile, port 80, set the `VITE_` env vars in the panel.

## Files

| Path | Purpose |
|------|---------|
| `src/content/tours.ts` | Single typed source for the 3 tours (TR/EN/FR) |
| `src/i18n/` | i18next init + locale strings |
| `src/components/reservation/` | Reservation form, schema |
| `src/pages/` | Route pages |
| `supabase/migrations/` | Database schema + RLS |
| `legacy/` | Previous static site (kept for reference) |
