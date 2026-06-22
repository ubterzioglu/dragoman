# Dragoman Turkey Public Site Source Package

Hazırlanma amacı: Bu paket Claude Code'a verilerek `https://dragoman-turkey.com/` sitesindeki public içeriklerin düzenli şekilde yeniden çekilmesi, analiz edilmesi veya yeni bir site/proje içerisine aktarılması için hazırlandı.

## Önemli not

Bu paket server-side kaynak kodunu içermez. WordPress/PHP tema dosyaları, admin paneli, veritabanı ve özel eklenti kaynakları dışarıdan erişilebilir değildir. Bu paket sadece public olarak görünen web içeriği, URL haritası, içerik özeti ve yeniden indirme scriptlerini içerir.

## Paket içeriği

```text
.
├── README.md
├── CLAUDE_CODE_MASTER_PROMPT.md
├── requirements.txt
├── data/
│   └── discovered_urls.csv
├── content/
│   ├── site_overview.md
│   └── extracted_public_content_samples.md
└── scripts/
    ├── run_scrape.ps1
    └── scrape_dragoman_public.py
```

## Claude Code için önerilen kullanım

1. Bu ZIP'i aç.
2. `CLAUDE_CODE_MASTER_PROMPT.md` dosyasını Claude Code'a ilk mesaj olarak ver.
3. Windows PowerShell ile şu komutu çalıştır:

```powershell
.\scripts\run_scrape.ps1
```

Script çalışınca şu klasörler oluşur:

```text
site_mirror/
├── raw_html/       # Public HTML kopyaları
├── markdown/       # Temizlenmiş Markdown içerikler
├── assets/         # Görsel/CSS/JS gibi public asset dosyaları
├── manifest.json   # URL, başlık, dosya yolu, asset listesi
└── pages.csv       # Sayfa listesi
```

## Çekilecek ana alanlar

- English pages
- Turkish pages
- French pages
- Blog posts
- Product pages
- WooCommerce category pages
- Public images/assets

## Kapsam dışı

- WordPress admin paneli
- PHP/tema kaynak kodu
- Database dump
- Private API endpoints
- Giriş gerektiren kullanıcı/ödeme/sepet verileri

