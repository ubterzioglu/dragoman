# Claude Code Master Prompt — Dragoman Turkey Public Website Scrape

You are working with a public website content package for `https://dragoman-turkey.com/`.

Goal: download and organize all public website resources that are accessible without login, then make the content easy to reuse in a new codebase.

Tasks:

1. Run the scraper:

```powershell
.\scripts\run_scrape.ps1
```

2. Review generated output under `site_mirror/`:
   - `raw_html/`: raw public HTML pages
   - `markdown/`: cleaned content files
   - `assets/`: public images, CSS, JS, PDFs or other static files discovered in HTML
   - `manifest.json`: structured crawl manifest
   - `pages.csv`: page inventory

3. Preserve the language structure:
   - `/` and English URLs = English
   - `/tr/` URLs = Turkish
   - `/fr/` URLs = French

4. Treat WooCommerce/cart/payment/account pages carefully:
   - Keep product pages and product category pages.
   - Do not scrape private account, checkout session, cart state or user-specific pages.

5. Suggested transformation output:
   - Create `content-model.json` with fields:
     - `source_url`
     - `language`
     - `page_type`
     - `title`
     - `headings`
     - `body_markdown`
     - `prices`
     - `routes`
     - `duration`
     - `distance`
     - `images`
     - `last_scraped_at`
   - Create separate collections for:
     - diving
     - sea_kayak
     - outdoor_activities
     - transportation_accommodation
     - lifeguard
     - blog
     - products
     - contact

6. Character cleanup notes:
   - Some old imported text may contain broken characters such as `cÅ“ur`, `cà´té`, `â€œ`, `â€`, `”`.
   - Normalize encoding to UTF-8.
   - Preserve Turkish characters.
   - Do not invent missing content.

7. Final deliverable suggestion:
   - `clean_content/dragoman-content.json`
   - `clean_content/dragoman-content.csv`
   - `clean_content/pages/*.md`
   - `clean_content/assets/`

