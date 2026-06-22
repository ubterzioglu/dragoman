"""Transform the raw site_mirror crawl into the structured deliverables described
in CLAUDE_CODE_MASTER_PROMPT.md (steps 5-7).

Reads:  site_mirror/manifest.json + site_mirror/raw_html/*.html
Writes: site_mirror/content-model.json
        clean_content/dragoman-content.json
        clean_content/dragoman-content.csv
        clean_content/pages/*.md
        clean_content/collections/{diving,sea_kayak,outdoor_activities,
            transportation_accommodation,lifeguard,blog,products,contact}.json
        clean_content/assets/  (copied from site_mirror/assets)

Reuses the crawler's language/page-type classification and encoding cleanup so
the two stages stay consistent. Never invents content: absent fields are left
empty/null.
"""
from __future__ import annotations

import csv
import json
import re
import shutil
import sys
from dataclasses import dataclass, asdict, field
from pathlib import Path

from bs4 import BeautifulSoup

# Import the crawler's helpers so classification + cleanup match Stage A exactly.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from scrape_dragoman_public import (  # noqa: E402
    infer_language,
    infer_page_type,
    normalize_text,
    clean_soup_for_content,
    html_to_markdown,
)

DOCS_ROOT = Path(__file__).resolve().parent.parent
SITE_MIRROR = DOCS_ROOT / "site_mirror"
CLEAN = DOCS_ROOT / "clean_content"

# Price tokens: €30, 30 €, EUR 30, 30 EUR, 30,00 €, 350 TL, ₺350, $39
PRICE_RE = re.compile(
    r"(?:(?:€|EUR|TL|₺|\$|USD)\s?\d[\d.,]*)|(?:\d[\d.,]*\s?(?:€|EUR|TL|₺|\$|USD))",
    re.IGNORECASE,
)
# Duration: "Duration: 6 hours", "Süre: 5 saat", "Durée: 2 jours", "5-6 saat"
DURATION_RE = re.compile(
    r"(?:duration|s[üu]re|dur[ée]e)\s*[:\-]?\s*([^\n.;]{1,40})",
    re.IGNORECASE,
)
DURATION_INLINE_RE = re.compile(
    r"\b(\d[\d.,/\- ]*\s?(?:hours?|hrs?|saat|heures?|days?|g[üu]n|jours?))\b",
    re.IGNORECASE,
)
# Distance: "Distance: 12 km", "Mesafe: 10 km"
DISTANCE_RE = re.compile(
    r"(?:distance|mesafe)\s*[:\-]?\s*([^\n.;]{1,40})",
    re.IGNORECASE,
)
DISTANCE_INLINE_RE = re.compile(r"\b(\d[\d.,/\- ]*\s?km)\b", re.IGNORECASE)


@dataclass
class ContentRecord:
    source_url: str
    language: str
    page_type: str
    title: str | None
    headings: list[str] = field(default_factory=list)
    body_markdown: str = ""
    prices: list[str] = field(default_factory=list)
    routes: list[str] = field(default_factory=list)
    duration: str | None = None
    distance: str | None = None
    images: list[str] = field(default_factory=list)
    last_scraped_at: str | None = None


def _dedupe_keep_order(items: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for it in items:
        key = it.strip()
        if key and key.lower() not in seen:
            seen.add(key.lower())
            out.append(key)
    return out


def extract_prices(text: str) -> list[str]:
    return _dedupe_keep_order([m.group(0).strip() for m in PRICE_RE.finditer(text)])


def extract_duration(text: str) -> str | None:
    m = DURATION_RE.search(text)
    if m and m.group(1).strip():
        return m.group(1).strip()
    m2 = DURATION_INLINE_RE.search(text)
    return m2.group(1).strip() if m2 else None


def extract_distance(text: str) -> str | None:
    m = DISTANCE_RE.search(text)
    if m and m.group(1).strip():
        return m.group(1).strip()
    m2 = DISTANCE_INLINE_RE.search(text)
    return m2.group(1).strip() if m2 else None


def extract_headings(soup: BeautifulSoup) -> list[str]:
    out: list[str] = []
    for level in ("h1", "h2", "h3"):
        for tag in soup.find_all(level):
            txt = normalize_text(tag.get_text(" ", strip=True))
            if txt:
                out.append(txt)
    return _dedupe_keep_order(out)


def extract_images(soup: BeautifulSoup) -> list[str]:
    out: list[str] = []
    for img in soup.find_all("img"):
        src = img.get("src") or ""
        if src and not src.startswith("data:"):
            out.append(src.strip())
    return _dedupe_keep_order(out)


def extract_routes(text: str, headings: list[str]) -> list[str]:
    """Best-effort tour/route names. Looks for known Kekova/Lycian tour tokens in
    headings; leaves empty when nothing matches (never invents)."""
    tokens = [
        "Kekova Classic", "Kekova West", "Kekova Ouest", "Kekova Batı",
        "Kekova East", "Kekova Est", "Kekova Doğu", "Kekova Delight",
        "Lycian Kayak", "Comfort Escape", "Coast of Light",
    ]
    found: list[str] = []
    hay = "\n".join(headings) + "\n" + text
    for tok in tokens:
        if re.search(re.escape(tok), hay, re.IGNORECASE):
            found.append(tok)
    return _dedupe_keep_order(found)


# page_type/url -> collection bucket
SERVICE_TOKEN_MAP = [
    ("sea_kayak", ["sea-kayak", "deniz-kanosu", "kayak-de-mer"]),
    ("diving", ["diving", "dalis", "plongee", "dalış"]),
    ("lifeguard", ["cankurtarma", "lifeguard"]),
    ("outdoor_activities", ["outdoor", "doga-etkinlikleri", "doga", "pleine-nature", "activites"]),
    ("transportation_accommodation", ["transportation", "ulasim", "konaklama", "hebergement", "transport"]),
]


def collection_for(rec: ContentRecord) -> str | None:
    path = rec.source_url.lower()
    pt = rec.page_type
    if pt in ("product", "product_category", "shop"):
        return "products"
    if pt == "contact":
        return "contact"
    if pt in ("blog", "blog_index", "blog_post"):
        return "blog"
    if pt == "service":
        for bucket, tokens in SERVICE_TOKEN_MAP:
            if any(t in path for t in tokens):
                return bucket
    # also catch service-like content pages by URL token even if classified 'page'
    for bucket, tokens in SERVICE_TOKEN_MAP:
        if any(t in path for t in tokens):
            return bucket
    return None  # home / about / legal -> not a domain collection


COLLECTIONS = [
    "diving", "sea_kayak", "outdoor_activities",
    "transportation_accommodation", "lifeguard", "blog", "products", "contact",
]


def build_record(entry: dict, scraped_at: str | None) -> ContentRecord | None:
    raw_rel = entry.get("raw_html_path")
    url = entry.get("url", "")
    if not raw_rel:
        return None
    raw_path = SITE_MIRROR / raw_rel
    if not raw_path.exists():
        return None
    html = raw_path.read_text(encoding="utf-8", errors="replace")
    full_soup = BeautifulSoup(html, "lxml")
    content_soup = clean_soup_for_content(full_soup)
    body_md, title = html_to_markdown(url, html)
    # strip the frontmatter html_to_markdown adds (we keep fields structured here)
    body_only = re.sub(r"^---.*?---\n\n", "", body_md, count=1, flags=re.S)
    text = normalize_text(content_soup.get_text("\n", strip=True))
    headings = extract_headings(content_soup)
    rec = ContentRecord(
        source_url=url,
        language=entry.get("language") or infer_language(url, full_soup),
        page_type=entry.get("page_type") or infer_page_type(url),
        title=normalize_text(title) if title else None,
        headings=headings,
        body_markdown=body_only.strip(),
        prices=extract_prices(text),
        routes=extract_routes(text, headings),
        duration=extract_duration(text),
        distance=extract_distance(text),
        images=extract_images(content_soup),
        last_scraped_at=scraped_at,
    )
    return rec


def main() -> None:
    manifest_path = SITE_MIRROR / "manifest.json"
    if not manifest_path.exists():
        sys.exit(f"manifest not found: {manifest_path} (run the crawler first)")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    scraped_at = manifest.get("scraped_at")

    records: list[ContentRecord] = []
    for entry in manifest.get("records", []):
        if entry.get("page_type") == "asset" or not entry.get("raw_html_path"):
            continue
        rec = build_record(entry, scraped_at)
        if rec:
            records.append(rec)

    # Output dirs
    (CLEAN / "pages").mkdir(parents=True, exist_ok=True)
    (CLEAN / "collections").mkdir(parents=True, exist_ok=True)

    dicts = [asdict(r) for r in records]

    # content-model.json (next to the mirror) + all-records json in clean_content
    (SITE_MIRROR / "content-model.json").write_text(
        json.dumps(dicts, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (CLEAN / "dragoman-content.json").write_text(
        json.dumps(dicts, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # Flat CSV
    with (CLEAN / "dragoman-content.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["source_url", "language", "page_type", "title",
                    "prices", "duration", "distance", "routes", "n_images"])
        for r in records:
            w.writerow([r.source_url, r.language, r.page_type, r.title or "",
                        " | ".join(r.prices), r.duration or "", r.distance or "",
                        " | ".join(r.routes), len(r.images)])

    # Per-page cleaned markdown
    for r in records:
        slug = re.sub(r"[^a-z0-9]+", "-", r.source_url.replace("https://", "")).strip("-")[:120] or "page"
        fm = (f"---\nsource_url: {r.source_url}\nlanguage: {r.language}\n"
              f"page_type: {r.page_type}\ntitle: {json.dumps(r.title, ensure_ascii=False)}\n"
              f"prices: {json.dumps(r.prices, ensure_ascii=False)}\n"
              f"duration: {json.dumps(r.duration, ensure_ascii=False)}\n"
              f"distance: {json.dumps(r.distance, ensure_ascii=False)}\n"
              f"routes: {json.dumps(r.routes, ensure_ascii=False)}\n"
              f"last_scraped_at: {r.last_scraped_at}\n---\n\n")
        (CLEAN / "pages" / f"{slug}.md").write_text(fm + r.body_markdown + "\n", encoding="utf-8")

    # Collections
    buckets: dict[str, list[dict]] = {c: [] for c in COLLECTIONS}
    for r in records:
        c = collection_for(r)
        if c:
            buckets[c].append(asdict(r))
    for c in COLLECTIONS:
        (CLEAN / "collections" / f"{c}.json").write_text(
            json.dumps(buckets[c], ensure_ascii=False, indent=2), encoding="utf-8"
        )

    # Self-contained assets copy
    src_assets = SITE_MIRROR / "assets"
    dst_assets = CLEAN / "assets"
    if src_assets.exists():
        if dst_assets.exists():
            shutil.rmtree(dst_assets)
        shutil.copytree(src_assets, dst_assets)

    # Summary
    print(f"records: {len(records)}")
    by_lang: dict[str, int] = {}
    for r in records:
        by_lang[r.language] = by_lang.get(r.language, 0) + 1
    print(f"by language: {by_lang}")
    print("collection counts: " + ", ".join(f"{c}={len(buckets[c])}" for c in COLLECTIONS))
    print(f"with prices: {sum(1 for r in records if r.prices)}")
    print("done")


if __name__ == "__main__":
    main()
