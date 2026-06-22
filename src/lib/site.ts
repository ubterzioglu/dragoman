/**
 * Central business / brand configuration. Single source of truth for contact
 * details, social links and the supported languages. Real values come from
 * docs/ICERIK (Dragoman Turkey, Kaş/Antalya).
 */
export const SITE = {
  name: "Dragoman Diving & Outdoors",
  shortName: "Dragoman",
  domain: "https://dragomanturkey.online",
  ogImage: "https://dragomanturkey.online/seakayakog.jpg",
  // Contact (from dragoman-turkey.com — Dragoman Travel Agency / TÜRSAB A4615).
  phone: "+90 242 836 3614",
  mobile: "+90 533 290 14 63",
  fax: "+90 242 836 3615",
  // WhatsApp number in international digits, no "+" or spaces (the mobile line).
  whatsapp: "905332901463",
  email: "info@dragomanturkey.online",
  address: "Uzunçarşı Cad. No:15, Kaş 07580, Antalya, Türkiye",
  tursab: "A4615",
  // TODO: gerçek hesap adları gelince güncellenecek (placeholder).
  instagram: "https://instagram.com/dragomanturkey",
  facebook: "https://facebook.com/dragomanturkey",
  parentBrand: "Dragoman Turkey",
} as const;

export const LOCALES = ["en", "tr", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Path prefix the whole localized site is mounted under. The site is live at the
 * root, so this is empty; every localePath() link resolves to `/:lang/...`.
 */
export const BASE_PATH = "";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
