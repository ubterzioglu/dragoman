"""
Save a single public page as a browser-style "Web Page, Complete" mirror:
an HTML file plus a sibling "<title>_files" folder holding localized assets
(images, css, js, fonts). Mirrors the existing docs/divingpage layout so a
later implementation pass can read the page offline.

Usage:
    python scripts/save_single_page.py <url> --out-dir <folder> [--name <basename>]
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,tr;q=0.8",
}

# (tag, attribute) pairs whose URLs we localize.
ASSET_ATTRS = [
    ("img", "src"),
    ("img", "data-src"),
    ("link", "href"),
    ("script", "src"),
    ("source", "src"),
    ("source", "srcset"),
]


def safe_filename(url: str) -> str:
    """Derive a filesystem-safe filename from an asset URL."""
    path = urlparse(url).path
    base = os.path.basename(unquote(path)) or "asset"
    base = re.sub(r"[^A-Za-z0-9._-]", "_", base)
    if not base or base in (".", ".."):
        base = "asset"
    return base


def unique_name(name: str, used: set[str]) -> str:
    if name not in used:
        used.add(name)
        return name
    stem, ext = os.path.splitext(name)
    i = 1
    while f"{stem}({i}){ext}" in used:
        i += 1
    final = f"{stem}({i}){ext}"
    used.add(final)
    return final


def download(session: requests.Session, url: str, dest: str) -> bool:
    try:
        r = session.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
    except Exception as exc:  # noqa: BLE001 - report and skip, keep mirroring
        print(f"  ! skip {url} ({exc})", file=sys.stderr)
        return False
    with open(dest, "wb") as fh:
        fh.write(r.content)
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Save one page as HTML + _files mirror.")
    parser.add_argument("url")
    parser.add_argument("--out-dir", required=True, help="Folder to create the mirror in.")
    parser.add_argument("--name", default=None, help="Base name for the HTML file (no extension).")
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)

    session = requests.Session()
    print(f"Fetching {args.url}")
    resp = session.get(args.url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.encoding or "utf-8"

    soup = BeautifulSoup(resp.text, "lxml")

    title = (soup.title.string.strip() if soup.title and soup.title.string else "page")
    base_name = args.name or re.sub(r"[^A-Za-z0-9 _.-]", "", title).strip() or "page"
    files_dir_name = f"{base_name}_files"
    files_dir = os.path.join(args.out_dir, files_dir_name)
    os.makedirs(files_dir, exist_ok=True)

    used_names: set[str] = set()
    url_to_local: dict[str, str] = {}

    def localize(raw: str) -> str | None:
        raw = raw.strip()
        if not raw or raw.startswith(("data:", "#", "mailto:", "tel:", "javascript:")):
            return None
        abs_url = urljoin(args.url, raw)
        if not urlparse(abs_url).scheme.startswith("http"):
            return None
        if abs_url in url_to_local:
            return url_to_local[abs_url]
        fname = unique_name(safe_filename(abs_url), used_names)
        dest = os.path.join(files_dir, fname)
        if download(session, abs_url, dest):
            rel = f"{files_dir_name}/{fname}"
            url_to_local[abs_url] = rel
            return rel
        return None

    count = 0
    for tag_name, attr in ASSET_ATTRS:
        for tag in soup.find_all(tag_name):
            val = tag.get(attr)
            if not val:
                continue
            if attr == "srcset":
                # srcset: "url1 1x, url2 2x" -> localize each url
                new_parts = []
                for part in val.split(","):
                    bits = part.strip().split(" ", 1)
                    local = localize(bits[0])
                    if local:
                        bits[0] = local
                        count += 1
                    new_parts.append(" ".join(bits))
                tag[attr] = ", ".join(new_parts)
            else:
                local = localize(val)
                if local:
                    tag[attr] = local
                    count += 1

    html_path = os.path.join(args.out_dir, f"{base_name}.html")
    with open(html_path, "w", encoding="utf-8") as fh:
        fh.write(str(soup))

    print(f"Saved HTML -> {html_path}")
    print(f"Localized {count} asset references into {files_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
