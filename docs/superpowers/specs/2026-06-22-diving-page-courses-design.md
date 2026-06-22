# Diving Page — Course Catalog with Popup + Detail Pages

**Date:** 2026-06-22
**Status:** Approved design (pre-implementation)

## Goal

Rebuild the Diving page (`src/pages/Diving.tsx`) to faithfully present the content
from the reference page (`docs/divingpage/Diving – Dragoman Diving and Outdoors.html`).
The centerpiece is an interactive **course catalog**: each course is a card; clicking
a card opens a **popup with a short intro** ("ara bilgi"); clicking **"Details"** in the
popup opens a **separate detail page**. Other content (dive center info, boat, prices)
is laid out cleanly around it.

## Source content

- **Primary:** `docs/divingpage/Diving – Dragoman Diving and Outdoors.html` — full course
  catalog with each course's short intro + long description (English).
- **Secondary:** `docs/divingpage/scrape/home.html` + `home-structure.md` — scraped live
  homepage (nav, hero headings). Body text is JS-rendered, only headings available.
  Used for site-identity context, not course content.

## Decisions (from brainstorming)

| Topic | Decision |
|-------|----------|
| Course scope | **All courses (~20+)** — intro, certification, professional, and all specialty courses, matching the reference 1:1. |
| Card layout | **Single flat grid** — no category grouping/tabs in the UI. |
| Translations | Source authored in **English**; TR/FR generated **build-time via DeepL** (free tier key in `.env.local`). |
| Detail page routing | **Separate route + slug**, mirroring the existing `TourDetail` pattern (Approach A). |
| Detail CTA | **WhatsApp + Contact**, reusing `buildWhatsappLink` and the contact link (same as `TourDetail`). |

## Page structure (`Diving.tsx`)

Reordered to follow the reference flow:

1. **Hero** — Kaş diving destination intro (30+ dive spots, 19–29°C, year-round, turtles/seals).
   Uses the `hero-gradient` band style from `TourDetail`.
2. **Dive Center Info** — since 2002, 7 instructors, TSSF #32, SSI Diamond #729285 + equipment
   inventory. Existing `DIVE_CENTER.facts` cards kept; descriptive paragraph added.
3. **Boat — Dragoman** — 21 m boat specs + Dragoman Junior safety/private boat.
4. **Courses (Diving Courses)** — `CourseCard` grid → `CourseModal` → detail page. *(New feature.)*
5. **Prices** — existing `DIVE_PRICES` tables (4 tables) preserved, below courses.
6. **CTA** — bottom reservation/WhatsApp band.

## Content model (`src/content/diving-courses.ts`)

Follows the existing `Localized<T>` pattern from `content/diving.ts`.

```ts
export interface DiveCourse {
  slug: string;                      // "ssi-open-water-diver" — URL + key
  category: "intro" | "certification" | "professional" | "specialty";
  title: Localized<string>;          // card title + popup title + detail H1
  intro: Localized<string>;          // POPUP short "ara bilgi" (1–2 sentences)
  description: Localized<string[]>;  // DETAIL page body (full reference paragraphs)
  highlights?: Localized<string[]>;  // optional bullet list on detail page
  priceFromEur?: number;             // optional, matched against DIVE_PRICES
}

export function getCourse(slug: string): DiveCourse | undefined;
```

- `intro` → text shown in the popup (short).
- `description` → body of the separate detail page (long, paragraph array).
- `category` stored in data for future grouping/filtering, but **UI renders a single flat
  grid** per the layout decision (no grouping now).
- `priceFromEur` optional: when a course matches a `DIVE_PRICES` item, show a "from €X" badge
  on card/detail; hidden when no match.

## Components & routing

### New / changed files

1. `src/content/diving-courses.ts` — generated catalog (TR/EN/FR) + `getCourse(slug)`.
2. `src/content/diving-courses.source.ts` — **English source** (en fields + slug/category/priceFromEur),
   input to the translation script.
3. `src/components/diving/CourseCard.tsx` — card; title + truncated `intro` + "view" hint.
   Whole card clickable → opens popup via parent state. Follows `TourCard` styling.
4. `src/components/diving/CourseModal.tsx` — wraps existing `Modal`. Shows title + `intro` +
   optional "from €X" badge + two actions: **"Details"** (`<Link>` → detail page, closes modal)
   and **"Close"**.
5. `src/pages/DiveCourseDetail.tsx` — mirrors `TourDetail`:
   - `useParams<{ slug }>` → `getCourse(slug)`; if missing, back-link to Diving page.
   - `hero-gradient` band + title + `intro`.
   - `description` paragraphs (main body); optional `highlights` list.
   - `<Seo>` + JSON-LD (`Course`).
   - Bottom CTA: **WhatsApp + Contact** (`buildWhatsappLink` + contact link).
6. `src/pages/Diving.tsx` — reordered per page structure; Courses section renders `CourseCard`
   grid + one `CourseModal` (driven by selected-course state). Dive-center + price tables kept.

### Routing (`App.tsx`)

- Fixed sub-segment `kurslar`; no `SEG` change needed:
  `<Route path={`${SEG.diving}/kurslar/:slug`} element={<DiveCourseDetail />} />`
- URL example: `/en/dalis/kurslar/ssi-open-water-diver`
- `DiveCourseDetail` lazy-imported like other pages.

### Flow

Card click → `CourseModal` (intro/ara bilgi) → "Details" → `/…/dalis/kurslar/:slug` page.
Back button returns to the Diving page (modal state not persisted — expected).

## Translation pipeline (build-time, no runtime API)

1. `scripts/translate-courses.mjs` (Node):
   - Reads `src/content/diving-courses.source.ts` (en + slug/category/priceFromEur).
   - Calls DeepL free API (`api-free.deepl.com`) with `DEEPL_API_KEY` from `.env.local`,
     `en→tr` and `en→fr`. Plain text; arrays translated element-wise, order preserved.
   - Writes generated `src/content/diving-courses.ts` (TR/EN/FR-filled `DiveCourse[]`).
   - Idempotent with a simple cache (`scripts/.deepl-cache.json`) keyed by source text to
     avoid re-spending free-tier quota.
   - `package.json` script: `"translate:courses": "node scripts/translate-courses.mjs"`.
2. **Security:** key read only from `.env.local` (verify it is gitignored); never committed.
   Script errors clearly if `DEEPL_API_KEY` is absent.
3. **Fallback:** if DeepL quota/errors, copy EN text into TR/FR and warn — build does not break.

## Images

- Use existing diving-related assets in `public/`. Where no course-specific image exists,
  `hero-gradient` background + icon suffices. No invented/placeholder images.

## Testing / verification

- `npm run build` (and `tsc`) green — type safety + compile.
- `getCourse` null path handled (back-link).
- Manual spot-check of a few course slugs: popup intro + detail page render in all 3 langs.
- If a test runner exists, add a small unit test for `getCourse`; do not force one otherwise.

## Out of scope

- Category grouping / filter UI (data carries `category` for the future).
- Price–course exact matching beyond the optional `priceFromEur` badge.
- Changes to other pages (Tours, Outdoor, etc.).
- Runtime/on-the-fly translation.
