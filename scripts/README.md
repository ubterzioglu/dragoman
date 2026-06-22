# Scripts

## scrape-google-reviews.mjs

One-time / monthly **free** Google Maps review scraper (local Playwright).
Pulls **all** reviews from the business page and writes a JSON array ready to
paste into the admin panel.

### Run

```bash
npm i -D playwright
npx playwright install chromium

# default URL (Dragoman SeaKayak):
npm run scrape:reviews

# or a specific URL / to watch it work:
HEADFUL=1 node scripts/scrape-google-reviews.mjs "https://maps.app.goo.gl/pDn4HTyraEKg5Buh8"
```

Output: `scripts/output/reviews.json`.

### Import

1. Open `/admin` → **Yorumlar** tab → **Toplu Ekle**.
2. Paste the contents of `reviews.json`.
3. Click **Yorumları Ekle**. Reviews are published immediately (auto-publish).
4. The insert trigger auto-translates each review into TR/EN/FR/RU. If the free
   MyMemory quota throttles a big first batch, click **Tümünü Çevir** later to
   fill in the missing languages (already-translated rows are skipped).

> If Google changes its DOM and the scraper returns 0 reviews, run with
> `HEADFUL=1` and update the selectors in `scrape-google-reviews.mjs`.

---

## Translation pipeline setup (one time)

The auto-translate trigger calls the `translate-review` Edge Function via
`pg_net`. Configure it once:

```bash
# 1. Apply migrations (creates tables, trigger, enables pg_net)
supabase db push

# 2. Deploy the function
supabase functions deploy translate-review

# 3. Set the function's shared secret (any long random string)
supabase secrets set EDGE_SHARED_SECRET="<random-secret>"
# optional: raise MyMemory's free daily quota with a contact email
supabase secrets set MYMEMORY_EMAIL="info@dragomanseakayak.com"

# 4. Tell the DB trigger where the function lives + the same secret (Vault).
#    Run in the Supabase SQL editor (replace <ref> and <random-secret>):
#    select vault.create_secret(
#      'https://<ref>.supabase.co/functions/v1/translate-review', 'edge_translate_url');
#    select vault.create_secret('<random-secret>', 'edge_shared_secret');
```

If the Vault secrets are absent, review inserts still succeed — they just won't
auto-translate until you configure the URL/secret and press **Tümünü Çevir**.
