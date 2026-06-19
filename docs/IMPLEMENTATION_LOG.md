# Dragoman SeaKayak — Uygulama Günlüğü (Implementation Log)

**Tarih:** 2026-06-19
**Branch:** main
**Özet:** Statik "Çok Yakında" sayfası, `github.com/ubterzioglu/corteqsmvp` teknoloji yığını kullanılarak tam donanımlı, çok dilli (TR/EN/FR) bir pazarlama + rezervasyon-talebi sitesine dönüştürüldü. Mevcut Docker/Coolify deploy deseni korundu.

---

## 1. Başlangıç Durumu

Depo (`c:\temp_private\dmseakayak`) şunlardan oluşuyordu:
- `index.html` — statik "Çok Yakında" sayfası (geri sayım + e-posta formu)
- `mvp.html` — önizleme sayfası (tur kartları taslağı)
- `admin.html` — client-side sabit şifreli admin (`localStorage`)
- `nginx.conf` + `Dockerfile` (tek aşamalı nginx) → Coolify
- Domain: dragomanseakayak.com
- Marka: teal `#016352` + orange `#f16e0b`, Poppins font
- `docs/ICERIK/` — gerçek tur içerikleri (Word/PDF)
- `.env.local` — Supabase anahtarları (gitignored, **commit edilmemiş**)

### İçerik kaynakları (docs/ICERIK)
Çıkarılan gerçek içerik:
- **3 ana tur**: KEKOVA CLASSIC (€60, başlangıç, 8km), KEKOVA WEST (€70, orta/ileri, 15km+1.5km yürüyüş), KEKOVA EAST (€70, orta/ileri, 17km)
- Her tur için detaylı itinerary (buluşma, Üçağız, rota, öğle yemeği, dönüş)
- İşletme bilgileri: Uzunçarşı Cad. No:15, Kaş 07580, Antalya — Tel +90 242 836 3614 — Parent brand "Dragoman Turkey"

---

## 2. Kullanıcı Kararları (onaylı)

| Konu | Karar |
|------|-------|
| Kapsam | Tam pazarlama sitesi (Home + Turlar + 3 detay + Özel + Hakkımızda + Galeri + Yorumlar + İletişim + SSS) |
| Rezervasyon | Form → Supabase kayıt + WhatsApp yönlendirme (online ödeme YOK) |
| Diller | Türkçe (varsayılan), İngilizce, Fransızca (Rusça yok) |
| Geçiş | Statik site `/`'da React+Vite ile değiştirildi; "Çok Yakında" kaldırıldı |

---

## 3. Teknoloji Yığını (corteqsmvp ile birebir)

- **React 18.3 + Vite 5.4 + TypeScript 5.8** (SPA), npm
- **Tailwind CSS 3.4** + shadcn-tarzı UI primitives + lucide-react + framer-motion + embla-carousel-react
- **react-router-dom 7** — dil önekli rotalar (`/:lang/...`)
- **react-i18next + i18next + i18next-browser-languagedetector** (eklendi — corteqsmvp'de yoktu)
- **react-helmet-async** (eklendi — per-route SEO/OG/JSON-LD/hreflang)
- **react-hook-form 7 + zod** — rezervasyon formu
- **@supabase/supabase-js 2** — rezervasyon + admin auth
- **@tanstack/react-query** + sonner (toast)
- Deploy: multi-stage Docker (node:22-alpine → nginx:1.27-alpine), runtime env enjeksiyonu

---

## 4. Oluşturulan Dosya Yapısı (47 kaynak dosyası)

```
dmseakayak/
├─ index.html                      # Vite giriş (eski → legacy/)
├─ package.json, vite.config.ts, vitest.config.ts
├─ tsconfig.json + tsconfig.app.json + tsconfig.node.json
├─ tailwind.config.ts, postcss.config.js
├─ Dockerfile                      # YENİ: multi-stage
├─ nginx.conf                      # YENİ: SPA try_files + güvenlik + cache
├─ docker-entrypoint-env.sh        # YENİ: runtime VITE_ env enjeksiyonu
├─ .dockerignore                   # güncellendi
├─ README.md                       # yeni stack'e göre güncellendi
├─ public/
│  ├─ logo.png, walogo.png, seakayakog.jpg
│  ├─ env-config.js                # runtime env placeholder
│  ├─ robots.txt                   # /admin disallow
│  └─ sitemap.xml                  # çok dilli (tr/en/fr hreflang)
├─ supabase/migrations/
│  └─ 0001_reservations.sql        # tablo + RLS
├─ legacy/                         # eski statik site (index/mvp/admin.html)
└─ src/
   ├─ main.tsx                     # Router + QueryClient + Helmet + Toaster
   ├─ App.tsx                      # rotalar (lazy/code-split) + locale guard
   ├─ index.css                    # Tailwind + marka tokenları + .hero-gradient
   ├─ vite-env.d.ts
   ├─ lib/
   │  ├─ site.ts                   # SITE config (iletişim, sosyal), LOCALES
   │  ├─ routes.ts                 # SEG (TR slug'lar)
   │  ├─ env.ts                    # runtime > build env çözümleme
   │  ├─ supabase.ts               # anon client (null-safe)
   │  ├─ utils.ts                  # cn()
   │  ├─ whatsapp.ts               # buildWhatsappLink() (+ test)
   │  ├─ whatsapp.test.ts
   │  └─ site.ts
   ├─ i18n/
   │  ├─ index.ts                  # i18next init
   │  └─ locales/{tr,en,fr}/common.json
   ├─ content/
   │  ├─ tours.ts                  # TEK kaynak: 3 tur, 3 dil (+ test)
   │  └─ tours.test.ts
   ├─ hooks/
   │  ├─ useLang.ts                # locale + t + pick + localePath
   │  └─ useReservations.ts        # submitReservation (null-safe, throw etmez)
   ├─ components/
   │  ├─ ui/ (button, card, input, label, textarea, section)
   │  ├─ layout/ (SiteLayout, Header, Footer, LanguageSwitcher, WhatsappFab)
   │  ├─ home/ (Hero, TourHighlights, WhyChooseUs)
   │  ├─ tours/ (TourCard [expand panel], TourGrid, Itinerary)
   │  ├─ reservation/ (ReservationForm, schema.ts [+ test])
   │  └─ seo/Seo.tsx
   └─ pages/
      ├─ Home, Tours, TourDetail, CustomTours, About,
      ├─ Gallery, Reviews, Contact, Faq, NotFound
      └─ admin/AdminPage.tsx       # Supabase Auth + rezervasyon listesi
```

---

## 5. Önemli Tasarım Kararları

### Çok dillilik (i18n)
- URL stratejisi: **dil önekli yollar** `/:lang/...` (tr varsayılan, `/` → `/tr`)
- `useLang()` hook: `:lang` param'ından locale çıkarır, i18next + `<html lang>` senkron, `pick()` (tur içeriği için) + `localePath()` (yol üretimi)
- UI metinleri: `i18n/locales/{tr,en,fr}/common.json`
- Tur içeriği: `content/tours.ts` içinde `Localized<T> = Record<Locale,T>` ile gömülü

### Rezervasyon akışı (çift aksiyon)
1. `submitReservation()` → Supabase `reservation_requests` insert (RLS: anon insert serbest)
2. `buildWhatsappLink()` → önceden doldurulmuş WhatsApp mesajı açılır
3. Supabase yoksa/hata verirse → toast + WhatsApp fallback (talep yine de iletilir)
4. Honeypot alanı ile anti-spam; zod doğrulama

### Supabase tablosu (RLS)
- `reservation_requests`: anon **insert** serbest, **select/update** sadece authenticated
- Admin: client-side sabit şifre yerine **Supabase Auth** (email+şifre)

### SEO
- `Seo.tsx` (react-helmet-async): title, description, canonical, OG/Twitter, **hreflang** (tr/en/fr + x-default), **JSON-LD** (Home → SportsActivityLocation, TourDetail → Product/offers)
- Çok dilli sitemap.xml, robots.txt

### Güvenlik
- `.env.local` zaten gitignored ve **hiç commit edilmemiş** (git log boş) → sızıntı yok
- `service_role` anahtarı asla `VITE_` öneki ile istemciye girmez (sadece `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`)
- Yine de yayından önce service_role rotasyonu önerildi (önlem)

### Deploy (Docker + Coolify)
- Multi-stage: `node:22-alpine` build → `nginx:1.27-alpine` serve, port 80
- `nginx.conf`: SPA `try_files $uri /index.html`, güvenlik başlıkları, cache, gzip
- `docker-entrypoint-env.sh`: container başlangıcında `/env-config.js` üretir → `VITE_` public değişkenler rebuild olmadan Coolify'dan set edilebilir

### Performans
- Route bazlı **kod bölme** (React.lazy): ana paket 882 kB → **524 kB**; Supabase (213 kB) ve sayfalar ayrı chunk

---

## 6. Doğrulama Sonuçları

| Kontrol | Sonuç |
|---------|-------|
| `npx tsc -b` | ✅ 0 hata |
| `npx vitest run` | ✅ 12/12 test geçti |
| `npm run build` | ✅ başarılı (kod bölme aktif) |
| `docker build` | ✅ başarılı (multi-stage, exit 0) |
| `vite preview` smoke | ✅ kök + derin link `/en/turlar/kekova-west` + `env-config.js` → HTTP 200 |
| `docker run` (canlı) | ⚠️ Docker Desktop daemon build sonrası kapandı; imaj build oldu ama container çalışırken test edilemedi |

### Testler (12)
- `whatsapp.test.ts` (3): wa.me numarası, alan doldurma, boş alan atlama
- `schema.test.ts` (5): geçerli/geçersiz form, honeypot, party size sınırları, opsiyonel email
- `tours.test.ts` (4): 3 tur mevcut, getTour, 3 dilde tam içerik, geçerli fiyat/mesafe

---

## 7. Checklist Karşılığı (chatgptoutput.md → 46 madde)

Karşılanan başlıca maddeler:
- ✅ 3 ana tur öne çıkarma + detaylı açıklamalar
- ✅ Özel/kişiye özel turlar
- ✅ Çok dilli (TR/EN/FR) — tutarlı deneyim (RU kapsam dışı bırakıldı)
- ✅ WhatsApp / Instagram / E-posta butonları
- ✅ Online rezervasyon (talep formu) + hızlı fiyat görünümü
- ✅ Hakkımızda + Neden Bizi Seçmelisiniz
- ✅ Galeri (lightbox + carousel) — placeholder görsellerle
- ✅ Müşteri yorumları — dil/yıldız filtresi, tarihe göre sıralı, öne çıkanlar
- ✅ Harita (İletişim sayfası embed)
- ✅ SEO optimizasyonu (meta/OG/JSON-LD/hreflang/sitemap)
- ✅ Mobil optimizasyon (responsive header/menü)
- ✅ Site hızı (kod bölme)
- ✅ Net CTA'lar (Rezervasyon, Bize Ulaş)
- ✅ Renkli/canlı tasarım (teal+orange marka)
- ✅ Tarih seçimi (rezervasyon formu)

---

## 8. Açık Kalan / İçerik Bekleyen

- **Drone hero videosu + galeri görselleri**: şimdilik placeholder; Google Drive klasöründen gelince `public/images/tours/` ve `public/videos/hero.mp4` doldurulacak
- **WhatsApp numarası**: şu an sabit hat `+90 242 836 3614` (`src/lib/site.ts`); mobil numara varsa güncellenmeli
- **E-posta domaini**: `info@dragomanseakayak.com` vs `info@dragoman-turkey.com` netleştirilmeli
- **TR/FR çevirileri**: EN'den üretildi; pazarlama tonu için insan revizyonu önerilir
- **Yorumlar kaynağı**: şu an statik tipli dizi; ileride Supabase/Google entegrasyonu olabilir
- **Service role anahtarı rotasyonu**: önlem olarak önerildi
- **Supabase migration uygulama**: `0001_reservations.sql` Supabase'e uygulanmalı + 1 admin kullanıcı oluşturulmalı

---

## 9. Sonraki Adımlar (öneri)

1. `npm install && npm run dev` → 3 dilde gözden geçir
2. Supabase migration'ı uygula, admin kullanıcı oluştur, `.env.local` doldur
3. Görseller/video gelince placeholder'ları değiştir
4. Coolify'da `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` set et, deploy
5. Git commit + push

---

## 10. Çalıştırma Komutları

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build → dist/
npm run preview      # built dist'i servis et
npm test             # vitest (12 test)

# Docker
docker build -t dmseakayak .
docker run -p 8080:80 \
  -e VITE_SUPABASE_URL="..." -e VITE_SUPABASE_ANON_KEY="..." \
  dmseakayak
```
