import type { Locale } from "@/lib/site";

export type Localized<T> = Record<Locale, T>;

export interface Product {
  title: Localized<string>;
  priceEur: number;
  body: Localized<string>;
}

const T = (tr: string, en: string, fr: string): Localized<string> => ({ tr, en, fr });

/**
 * Shop products from dragoman-turkey.com (/shop, /product/*). Books by the
 * Dragoman team. Prices in EUR as published on the WooCommerce store.
 */
export const PRODUCTS: Product[] = [
  {
    title: T("Dalış Rehberi – Kaş", "The Diving Guide – Kaş", "The Diving Guide – Kaş"),
    priceEur: 30,
    body: T(
      "715 fotoğraf, 21 çift sayfa sualtı dalış noktası haritası, 21 İngilizce dalış brifingi, 10 logbook sayfası ve 307 tanımlanmış sualtı tür.",
      "715 photos, 21 double-page underwater dive-site maps, 21 dive briefings in English, 10 logbook pages and 307 identified underwater species.",
      "715 photos, 21 cartes double page des sites de plongée, 21 briefings de plongée en anglais, 10 pages de carnet et 307 espèces sous-marines identifiées.",
    ),
  },
  {
    title: T("Tropical Mediterranean", "Tropical Mediterranean", "Tropical Mediterranean"),
    priceEur: 39,
    body: T(
      "Murat Draman'ın Akdeniz'in derinliklerine dair son kitabı (İngilizce baskı).",
      "Murat Draman's latest book on the depths of the Mediterranean (English edition).",
      "Le dernier livre de Murat Draman sur les profondeurs de la Méditerranée (édition anglaise).",
    ),
  },
  {
    title: T("Tropikal Akdeniz", "Tropikal Akdeniz", "Tropikal Akdeniz"),
    priceEur: 39,
    body: T(
      "Murat Draman'ın Tropikal Akdeniz kitabının Türkçe baskısı.",
      "Turkish edition of Murat Draman's Tropical Mediterranean book.",
      "Édition turque du livre Méditerranée tropicale de Murat Draman.",
    ),
  },
];
