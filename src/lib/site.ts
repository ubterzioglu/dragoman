/**
 * Central business / brand configuration. Single source of truth for contact
 * details, social links and the supported languages. Real values come from
 * docs/ICERIK (Dragoman Turkey, Kaş/Antalya).
 */
export const SITE = {
  name: "Dragoman SeaKayak",
  domain: "https://dragomanseakayak.com",
  ogImage: "https://dragomanseakayak.com/seakayakog.jpg",
  // Contact (from the hotel-presentation PDF / business records)
  phone: "+90 242 836 3614",
  // WhatsApp number in international digits, no "+" or spaces. TODO: confirm a
  // mobile WhatsApp line — falls back to the landline for now.
  whatsapp: "902428363614",
  email: "info@dragomanseakayak.com",
  address: "Uzunçarşı Cad. No:15, Kaş 07580, Antalya, Türkiye",
  instagram: "https://instagram.com/dragomanseakayak",
  facebook: "https://facebook.com/dragomanseakayak",
  parentBrand: "Dragoman Turkey",
} as const;

export const LOCALES = ["tr", "en", "fr", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "tr";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
