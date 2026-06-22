// One-time Google Maps review scraper (free, runs locally with Playwright).
//
// Opens the business Maps page, switches to the Reviews tab, scrolls until all
// reviews are loaded, and writes them to scripts/output/reviews.json in the
// exact JSON-array shape the admin "Toplu Ekle" box accepts (see
// src/lib/parseReviews.ts) — plus extra fields the 0004 migration added.
//
// Usage:
//   npm i -D playwright
//   npx playwright install chromium
//   npm run scrape:reviews                       # uses the default URL below
//   node scripts/scrape-google-reviews.mjs "https://maps.app.goo.gl/..."
//
// NOTE: Google's DOM changes occasionally. This is a one-time / monthly tool;
// if selectors break, run with HEADFUL=1 to watch and adjust the selectors.

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_URL = "https://maps.app.goo.gl/pDn4HTyraEKg5Buh8";
const OUT = resolve(__dirname, "output", "reviews.json");

const SUPPORTED = ["tr", "en", "fr", "ru"];

/** Map Google's star aria-label (e.g. "5 yıldız" / "5 stars") to a number. */
function parseRating(label) {
  const m = (label || "").match(/\d+/);
  const n = m ? Number(m[0]) : 5;
  return Math.min(5, Math.max(1, n));
}

/** Crude language guess from the body so source_lang is reasonable; admin can fix. */
function guessLang(text) {
  const t = (text || "").toLowerCase();
  if (/[ğşıöçü]/.test(t) || /\b(çok|harika|tur|rehber|deneyim|teşekkür)\b/.test(t)) return "tr";
  if (/[а-яё]/.test(t)) return "ru";
  if (/\b(très|était|nous|magnifique|excellent|expérience|guide)\b/.test(t)) return "fr";
  return "en";
}

async function clickReviewsTab(page) {
  // Try several known labels across locales.
  const labels = ["Reviews", "Yorumlar", "Avis", "Отзывы"];
  for (const label of labels) {
    const btn = page.getByRole("tab", { name: new RegExp(label, "i") }).first();
    if (await btn.count().catch(() => 0)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(1500);
      return true;
    }
  }
  // Fallback: a button containing the word "review".
  const fallback = page.locator('button:has-text("review"), button:has-text("yorum")').first();
  if (await fallback.count().catch(() => 0)) {
    await fallback.click().catch(() => {});
    await page.waitForTimeout(1500);
    return true;
  }
  return false;
}

async function getScrollable(page) {
  // The reviews list lives in a scrollable feed pane.
  const candidates = [
    'div[role="feed"]',
    'div.m6QErb[aria-label]',
    'div.DxyBCb',
  ];
  for (const sel of candidates) {
    const el = page.locator(sel).first();
    if (await el.count().catch(() => 0)) return el;
  }
  return null;
}

async function expandMoreButtons(page) {
  // Click every "More"/"Daha fazla" to reveal truncated review bodies.
  const more = page.locator(
    'button[aria-label*="More"], button[aria-label*="Daha fazla"], button:has-text("More"), button:has-text("Daha fazla")',
  );
  const count = await more.count().catch(() => 0);
  for (let i = 0; i < count; i++) {
    await more.nth(i).click().catch(() => {});
  }
}

async function extractReviews(page) {
  return page.$$eval('div[data-review-id], div.jftiEf', (nodes) => {
    const seen = new Set();
    const out = [];
    for (const node of nodes) {
      const id =
        node.getAttribute("data-review-id") ||
        node.querySelector("[data-review-id]")?.getAttribute("data-review-id") ||
        "";
      if (id && seen.has(id)) continue;
      if (id) seen.add(id);

      const author =
        node.querySelector(".d4r55, .TSUbDb, [class*='fontTitleSmall']")?.textContent?.trim() || "";
      const ratingLabel =
        node.querySelector('[role="img"][aria-label]')?.getAttribute("aria-label") ||
        node.querySelector("span.kvMYJc")?.getAttribute("aria-label") ||
        "";
      const body =
        node.querySelector(".wiI7pd, .MyEned, [class*='fontBodyMedium']")?.textContent?.trim() || "";
      const dateText =
        node.querySelector(".rsqaWe, .DU9Pgb")?.textContent?.trim() || "";

      if (!author || !body) continue;
      out.push({ external_id: id || null, author, ratingLabel, body, dateText });
    }
    return out;
  });
}

async function main() {
  const url = process.argv[2] || DEFAULT_URL;
  const headful = process.env.HEADFUL === "1";
  console.log(`Opening: ${url}`);

  const browser = await chromium.launch({ headless: !headful });
  const page = await browser.newPage({
    locale: "en-US",
    viewport: { width: 1280, height: 900 },
  });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);

  // Consent screens (EU) — accept if present.
  for (const name of ["Accept all", "Tümünü kabul et", "Tout accepter", "Принять все"]) {
    const b = page.getByRole("button", { name: new RegExp(name, "i") }).first();
    if (await b.count().catch(() => 0)) {
      await b.click().catch(() => {});
      await page.waitForTimeout(1500);
      break;
    }
  }

  await clickReviewsTab(page);

  const scrollable = await getScrollable(page);
  if (!scrollable) {
    console.warn("Could not find the reviews scroll pane. Run with HEADFUL=1 to inspect.");
  }

  // Scroll until the count stops growing.
  let stable = 0;
  let lastCount = 0;
  for (let i = 0; i < 400 && stable < 6; i++) {
    if (scrollable) {
      await scrollable.evaluate((el) => el.scrollBy(0, el.scrollHeight)).catch(() => {});
    } else {
      await page.mouse.wheel(0, 4000);
    }
    await page.waitForTimeout(900);
    const current = await page.locator("div[data-review-id], div.jftiEf").count().catch(() => 0);
    if (current === lastCount) stable++;
    else stable = 0;
    lastCount = current;
    if (i % 10 === 0) console.log(`  ...loaded ~${current} reviews`);
  }

  await expandMoreButtons(page);
  await page.waitForTimeout(800);

  const raw = await extractReviews(page);
  console.log(`Extracted ${raw.length} reviews.`);

  const reviews = raw.map((r) => ({
    external_id: r.external_id,
    author: r.author,
    rating: parseRating(r.ratingLabel),
    body: r.body,
    source_label: "Google",
    source_lang: guessLang(r.body),
    // date left null; Google shows relative dates ("2 months ago") that are
    // not reliably parseable. Admin can ignore or set later.
    review_date: null,
  }));

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(reviews, null, 2), "utf8");
  console.log(`Wrote ${reviews.length} reviews → ${OUT}`);
  console.log("Next: paste this JSON into Admin → Yorumlar → Toplu Ekle.");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
