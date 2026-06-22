from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import sys
import time
from collections import deque
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse, urldefrag, unquote

import requests
from bs4 import BeautifulSoup
from slugify import slugify

try:
    import html2text
except Exception:  # pragma: no cover
    html2text = None

BASE_URL = "https://dragoman-turkey.com/"
DOMAIN = "dragoman-turkey.com"

SKIP_URL_PATTERNS = [
    r"/wp-admin/",
    r"/wp-login\.php",
    r"/my-account",
    r"/cart",
    r"/checkout",
    r"/sepet",
    r"/odeme",
    r"/hesabim",
    r"/mon-compte",
    r"/paiement",
    r"/chariot",
    r"add-to-cart=",
    r"\?replytocom=",
    r"/feed/?$",
    r"/comments/feed",
]

ASSET_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico",
    ".css", ".js", ".pdf", ".woff", ".woff2", ".ttf", ".eot", ".otf",
    ".mp4", ".webm", ".mov", ".mp3", ".wav",
}

HTML_EXTENSIONS = {"", ".html", ".htm", ".php"}


@dataclass
class PageRecord:
    url: str
    status_code: int | None
    content_type: str | None
    title: str | None
    language: str
    page_type: str
    raw_html_path: str | None
    markdown_path: str | None
    asset_count: int
    error: str | None = None


def normalize_url(url: str) -> str:
    url, _frag = urldefrag(url)
    parsed = urlparse(url)
    if not parsed.scheme:
        url = urljoin(BASE_URL, url)
        parsed = urlparse(url)
    scheme = "https"
    netloc = parsed.netloc.lower()
    path = re.sub(r"/{2,}", "/", parsed.path or "/")
    if path != "/" and path.endswith("/"):
        path = path[:-1] + "/"
    query = parsed.query
    return f"{scheme}://{netloc}{path}" + (f"?{query}" if query else "")


def same_domain(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.netloc.lower().replace("www.", "") == DOMAIN


def should_skip(url: str) -> bool:
    lower = url.lower()
    return any(re.search(pattern, lower) for pattern in SKIP_URL_PATTERNS)


def is_asset_url(url: str) -> bool:
    path = urlparse(url).path.lower()
    return Path(path).suffix in ASSET_EXTENSIONS


def looks_like_html_url(url: str) -> bool:
    path = urlparse(url).path.lower()
    return Path(path).suffix in HTML_EXTENSIONS


def safe_filename_for_url(url: str, suffix: str = "") -> str:
    parsed = urlparse(url)
    path = unquote(parsed.path.strip("/")) or "home"
    if parsed.query:
        path += "_" + hashlib.sha1(parsed.query.encode("utf-8")).hexdigest()[:10]
    name = slugify(path.replace("/", "__"), lowercase=True) or "page"
    if suffix and not name.endswith(suffix):
        name += suffix
    return name


def infer_language(url: str, soup: BeautifulSoup | None = None) -> str:
    path = urlparse(url).path
    if path.startswith("/tr/") or path == "/tr/":
        return "tr"
    if path.startswith("/fr/") or path == "/fr/":
        return "fr"
    if soup:
        html_tag = soup.find("html")
        if html_tag and html_tag.get("lang"):
            return str(html_tag.get("lang")).split("-")[0]
    return "en"


def infer_page_type(url: str) -> str:
    path = urlparse(url).path.strip("/")
    if path in {"", "tr", "fr"}:
        return "home"
    if "dragoman-blog" in path or path == "blog" or path.endswith("/blog"):
        return "blog"
    if "/product/" in path or "/produit/" in path or "/urun/" in path:
        return "product"
    if "product-category" in path:
        return "product_category"
    if "privacy" in path or "gizlilik" in path or "politique" in path or "refund" in path or "terms" in path or "sartlar" in path:
        return "legal"
    if "contact" in path or "iletisim" in path or "reserv" in path:
        return "contact"
    if any(token in path for token in ["diving", "dalis", "plongee", "sea-kayak", "deniz-kanosu", "kayak-de-mer", "outdoor", "doga", "cankurtarma", "transportation", "ulasim", "hebergement"]):
        return "service"
    if "shop" in path or "dukkan" in path or "boutique" in path:
        return "shop"
    if "dragoman" in path:
        return "about"
    return "page"


def clean_soup_for_content(soup: BeautifulSoup) -> BeautifulSoup:
    copy = BeautifulSoup(str(soup), "lxml")
    for selector in ["script", "style", "noscript", "form", "iframe"]:
        for tag in copy.select(selector):
            tag.decompose()
    for tag in copy.select("nav, header, footer, .site-header, .site-footer, .woocommerce-breadcrumb"):
        tag.decompose()
    main = copy.select_one("main") or copy.select_one("#content") or copy.body or copy
    return BeautifulSoup(str(main), "lxml")


def html_to_markdown(url: str, html: str) -> tuple[str, str | None]:
    soup = BeautifulSoup(html, "lxml")
    title_tag = soup.find("title")
    title = title_tag.get_text(" ", strip=True) if title_tag else None
    content = clean_soup_for_content(soup)
    if html2text:
        converter = html2text.HTML2Text()
        converter.ignore_links = False
        converter.ignore_images = False
        converter.body_width = 0
        markdown = converter.handle(str(content))
    else:
        markdown = content.get_text("\n", strip=True)
    markdown = normalize_text(markdown)
    header = f"---\nsource_url: {url}\ntitle: {json.dumps(title, ensure_ascii=False)}\nscraped_at: {datetime.now(timezone.utc).isoformat()}\n---\n\n"
    return header + markdown.strip() + "\n", title


def normalize_text(text: str) -> str:
    replacements = {
        "â€œ": "“", "â€": "”", "â€™": "’", "â€“": "–", "â€”": "—",
        "Â ": " ", "Â": "", "”": "”", "“": "“",
        "cÅ“ur": "cœur", "cà´té": "côté", "diplà´mé": "diplômé", "oà¹": "où",
        "àŽle": "Île", "à ": "à ", "camaà¯eux": "camaïeux",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_links_and_assets(url: str, html: str) -> tuple[set[str], set[str]]:
    soup = BeautifulSoup(html, "lxml")
    page_links: set[str] = set()
    asset_links: set[str] = set()

    for tag in soup.find_all("a", href=True):
        href = urljoin(url, tag["href"])
        href = normalize_url(href)
        if not same_domain(href) or should_skip(href):
            continue
        if is_asset_url(href):
            asset_links.add(href)
        elif looks_like_html_url(href):
            page_links.add(href)

    for tag, attr in [("img", "src"), ("script", "src"), ("link", "href"), ("source", "src")]:
        for item in soup.find_all(tag):
            value = item.get(attr)
            if not value:
                continue
            asset = normalize_url(urljoin(url, value))
            if same_domain(asset) and is_asset_url(asset) and not should_skip(asset):
                asset_links.add(asset)

        # srcset support
    for tag in soup.find_all(srcset=True):
        for part in str(tag.get("srcset", "")).split(","):
            asset_part = part.strip().split(" ")[0]
            if not asset_part:
                continue
            asset = normalize_url(urljoin(url, asset_part))
            if same_domain(asset) and is_asset_url(asset) and not should_skip(asset):
                asset_links.add(asset)

    return page_links, asset_links


def download_asset(session: requests.Session, asset_url: str, assets_dir: Path, delay: float = 0.1) -> str | None:
    parsed = urlparse(asset_url)
    path = Path(unquote(parsed.path.lstrip("/")))
    if not path.suffix:
        return None
    target = assets_dir / path
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.stat().st_size > 0:
        return str(target)
    try:
        time.sleep(delay)
        response = session.get(asset_url, timeout=30)
        response.raise_for_status()
        target.write_bytes(response.content)
        return str(target)
    except Exception as exc:
        print(f"[asset-error] {asset_url} -> {exc}", file=sys.stderr)
        return None


def load_seed_urls(seed_csv: Path | None) -> list[str]:
    seeds = [BASE_URL]
    if seed_csv and seed_csv.exists():
        with seed_csv.open("r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                url = (row.get("url") or "").strip()
                if url:
                    seeds.append(url)
    return sorted(set(normalize_url(url) for url in seeds if same_domain(normalize_url(url))))


def try_add_sitemap_urls(session: requests.Session, seeds: set[str]) -> None:
    for sitemap_url in [
        urljoin(BASE_URL, "sitemap.xml"),
        urljoin(BASE_URL, "wp-sitemap.xml"),
        urljoin(BASE_URL, "page-sitemap.xml"),
        urljoin(BASE_URL, "post-sitemap.xml"),
        urljoin(BASE_URL, "product-sitemap.xml"),
    ]:
        try:
            response = session.get(sitemap_url, timeout=20)
            if response.status_code >= 400:
                continue
            for loc in re.findall(r"<loc>(.*?)</loc>", response.text, flags=re.I | re.S):
                url = normalize_url(loc.strip())
                if same_domain(url) and not should_skip(url) and looks_like_html_url(url):
                    seeds.add(url)
        except Exception:
            continue


def try_wp_rest_index(session: requests.Session, seeds: set[str], output_dir: Path) -> None:
    api_dir = output_dir / "wp_json"
    api_dir.mkdir(parents=True, exist_ok=True)
    endpoints = [
        "wp-json/wp/v2/pages?per_page=100",
        "wp-json/wp/v2/posts?per_page=100",
        "wp-json/wp/v2/product?per_page=100",
        "wp-json/wp/v2/search?per_page=100&subtype=page,post,product",
    ]
    for endpoint in endpoints:
        url = urljoin(BASE_URL, endpoint)
        try:
            response = session.get(url, timeout=30)
            if response.status_code >= 400 or "application/json" not in response.headers.get("content-type", ""):
                continue
            filename = slugify(endpoint.replace("?", "__").replace("&", "__").replace("=", "-")) + ".json"
            (api_dir / filename).write_text(response.text, encoding="utf-8")
            data = response.json()
            if isinstance(data, list):
                for item in data:
                    link = item.get("link") if isinstance(item, dict) else None
                    if link:
                        page_url = normalize_url(link)
                        if same_domain(page_url) and not should_skip(page_url):
                            seeds.add(page_url)
        except Exception as exc:
            print(f"[wp-json-skip] {url} -> {exc}", file=sys.stderr)


def crawl(args: argparse.Namespace) -> None:
    output_dir = Path(args.output).resolve()
    raw_dir = output_dir / "raw_html"
    md_dir = output_dir / "markdown"
    assets_dir = output_dir / "assets"
    for directory in [raw_dir, md_dir, assets_dir]:
        directory.mkdir(parents=True, exist_ok=True)

    session = requests.Session()
    session.headers.update({
        "User-Agent": args.user_agent,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    })

    seeds = set(load_seed_urls(Path(args.seed_csv) if args.seed_csv else None))
    if args.use_sitemaps:
        try_add_sitemap_urls(session, seeds)
    if args.use_wp_json:
        try_wp_rest_index(session, seeds, output_dir)

    queue = deque(sorted(seeds))
    visited: set[str] = set()
    records: list[PageRecord] = []
    all_assets: set[str] = set()

    while queue and len(visited) < args.max_pages:
        url = normalize_url(queue.popleft())
        if url in visited or should_skip(url) or not same_domain(url):
            continue
        visited.add(url)
        print(f"[page] {len(visited):03d} {url}")
        try:
            time.sleep(args.delay)
            response = session.get(url, timeout=30)
            content_type = response.headers.get("content-type", "")
            status = response.status_code
            if status >= 400:
                records.append(PageRecord(url, status, content_type, None, infer_language(url), infer_page_type(url), None, None, 0, f"HTTP {status}"))
                continue
            if "text/html" not in content_type:
                if is_asset_url(url):
                    path = download_asset(session, url, assets_dir, delay=args.asset_delay)
                    all_assets.add(url)
                    records.append(PageRecord(url, status, content_type, None, infer_language(url), "asset", None, None, 1 if path else 0, None))
                continue

            html = response.text
            raw_name = safe_filename_for_url(url, ".html")
            raw_path = raw_dir / raw_name
            raw_path.write_text(html, encoding="utf-8", errors="replace")

            markdown, title = html_to_markdown(url, html)
            md_name = safe_filename_for_url(url, ".md")
            md_path = md_dir / md_name
            md_path.write_text(markdown, encoding="utf-8", errors="replace")

            soup = BeautifulSoup(html, "lxml")
            links, assets = extract_links_and_assets(url, html)
            all_assets.update(assets)
            for link in links:
                if link not in visited and len(visited) + len(queue) < args.max_queue:
                    queue.append(link)

            if args.download_assets:
                for asset in sorted(assets):
                    download_asset(session, asset, assets_dir, delay=args.asset_delay)

            records.append(PageRecord(
                url=url,
                status_code=status,
                content_type=content_type,
                title=title,
                language=infer_language(url, soup),
                page_type=infer_page_type(url),
                raw_html_path=str(raw_path.relative_to(output_dir)),
                markdown_path=str(md_path.relative_to(output_dir)),
                asset_count=len(assets),
            ))
        except Exception as exc:
            records.append(PageRecord(url, None, None, None, infer_language(url), infer_page_type(url), None, None, 0, str(exc)))
            print(f"[page-error] {url} -> {exc}", file=sys.stderr)

    manifest = {
        "base_url": BASE_URL,
        "scraped_at": datetime.now(timezone.utc).isoformat(),
        "page_count": len(records),
        "asset_url_count": len(all_assets),
        "records": [asdict(record) for record in records],
        "asset_urls": sorted(all_assets),
    }
    (output_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    with (output_dir / "pages.csv").open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(asdict(PageRecord("", None, None, None, "", "", None, None, 0)).keys()))
        writer.writeheader()
        for record in records:
            writer.writerow(asdict(record))

    print(f"\nDone. Output: {output_dir}")
    print(f"Pages: {len(records)}")
    print(f"Assets discovered: {len(all_assets)}")


def parse_args(argv: Iterable[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Crawl Dragoman Turkey public website content.")
    parser.add_argument("--output", default="site_mirror", help="Output directory")
    parser.add_argument("--seed-csv", default="data/discovered_urls.csv", help="CSV with seed URLs")
    parser.add_argument("--max-pages", type=int, default=300, help="Maximum HTML pages to crawl")
    parser.add_argument("--max-queue", type=int, default=1000, help="Maximum pending + visited URL budget")
    parser.add_argument("--delay", type=float, default=0.35, help="Delay between page requests")
    parser.add_argument("--asset-delay", type=float, default=0.05, help="Delay between asset downloads")
    parser.add_argument("--download-assets", action="store_true", default=True, help="Download discovered public assets")
    parser.add_argument("--no-assets", dest="download_assets", action="store_false", help="Do not download assets")
    parser.add_argument("--use-sitemaps", action="store_true", default=True, help="Try common sitemap URLs")
    parser.add_argument("--no-sitemaps", dest="use_sitemaps", action="store_false", help="Do not try sitemaps")
    parser.add_argument("--use-wp-json", action="store_true", default=True, help="Try public WordPress REST endpoints")
    parser.add_argument("--no-wp-json", dest="use_wp_json", action="store_false", help="Do not try WordPress REST endpoints")
    parser.add_argument("--user-agent", default="DragomanPublicContentIndexer/1.0 (+manual owner-assisted crawl)")
    return parser.parse_args(list(argv) if argv is not None else None)


if __name__ == "__main__":
    crawl(parse_args())
