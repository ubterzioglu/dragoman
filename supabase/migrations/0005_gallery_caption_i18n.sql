-- Multilingual gallery captions. The base `caption` column holds Turkish (the
-- default locale); these add per-language captions for en/fr/ru so the public
-- /galeri page can show the caption in the visitor's active locale. Admins fill
-- these in by hand from the gallery panel (no auto-translation). All nullable —
-- when a language is empty the render layer falls back to the Turkish caption.

alter table public.gallery_images
  add column if not exists caption_en text,
  add column if not exists caption_fr text,
  add column if not exists caption_ru text;
