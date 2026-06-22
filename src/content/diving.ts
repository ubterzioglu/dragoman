import type { Locale } from "@/lib/site";

export type Localized<T> = Record<Locale, T>;

/** A priced line item (single dive, package, course). Price is the EUR figure. */
export interface PriceItem {
  label: Localized<string>;
  priceEur: number;
}

export interface PriceTable {
  title: Localized<string>;
  items: PriceItem[];
}

/**
 * Dragoman diving content, sourced from dragoman-turkey.com (/diving, /tr/diving,
 * /fr/plongee). TSSF authorized center #32, SSI Diamond Center #729285. Prices in
 * EUR as published; never invented — only what the public site lists.
 */
export const DIVE_CENTER: {
  facts: Localized<{ label: string; value: string }[]>;
} = {
  facts: {
    tr: [
      { label: "TSSF yetkili dalış merkezi", value: "#32" },
      { label: "SSI Diamond Center", value: "#729285" },
      { label: "Eğitim dilleri", value: "Türkçe, İngilizce, Fransızca, Almanca" },
      { label: "Tekne", value: "21 metrelik Dragoman" },
      { label: "Özel hizmet & emniyet teknesi", value: "Dragoman Junior" },
    ],
    en: [
      { label: "TSSF authorized dive center", value: "#32" },
      { label: "SSI Diamond Center", value: "#729285" },
      { label: "Training languages", value: "Turkish, English, French, German" },
      { label: "Boat", value: "21-metre Dragoman" },
      { label: "Private service & safety boat", value: "Dragoman Junior" },
    ],
    fr: [
      { label: "Centre de plongée agréé TSSF", value: "#32" },
      { label: "SSI Diamond Center", value: "#729285" },
      { label: "Langues d'enseignement", value: "turc, anglais, français, allemand" },
      { label: "Bateau", value: "Dragoman de 21 mètres" },
      { label: "Bateau privé & de sécurité", value: "Dragoman Junior" },
    ],
  },
};

const T = (tr: string, en: string, fr: string): Localized<string> => ({ tr, en, fr });

export const DIVE_PRICES: PriceTable[] = [
  {
    title: T("Ekipmansız dalış", "Without equipment", "Sans équipement"),
    items: [
      { label: T("Tek dalış", "Single dive", "Plongée simple"), priceEur: 30 },
      { label: T("6'lı dalış paketi", "6-dive package", "Forfait 6 plongées"), priceEur: 171 },
      { label: T("10'lu dalış paketi", "10-dive package", "Forfait 10 plongées"), priceEur: 270 },
      { label: T("20'li dalış paketi", "20-dive package", "Forfait 20 plongées"), priceEur: 480 },
      { label: T("Sidemount", "Sidemount", "Sidemount"), priceEur: 44 },
      { label: T("Gece dalışı", "Night dive", "Plongée de nuit"), priceEur: 35 },
      { label: T("Şafak dalışı", "Dawn dive", "Plongée à l'aube"), priceEur: 35 },
    ],
  },
  {
    title: T("Ekipmanlı dalış", "With equipment", "Avec équipement"),
    items: [
      { label: T("Tek dalış", "Single dive", "Plongée simple"), priceEur: 39 },
      { label: T("6'lı dalış paketi", "6-dive package", "Forfait 6 plongées"), priceEur: 222 },
      { label: T("10'lu dalış paketi", "10-dive package", "Forfait 10 plongées"), priceEur: 351 },
      { label: T("20'li dalış paketi", "20-dive package", "Forfait 20 plongées"), priceEur: 624 },
      { label: T("Sidemount", "Sidemount", "Sidemount"), priceEur: 55 },
      { label: T("Gece dalışı", "Night dive", "Plongée de nuit"), priceEur: 44 },
      { label: T("Şafak dalışı", "Dawn dive", "Plongée à l'aube"), priceEur: 44 },
    ],
  },
  {
    title: T("SSI kursları", "SSI courses", "Stages SSI"),
    items: [
      { label: T("SSI Deneme Dalışı", "SSI Try Scuba", "SSI Baptême"), priceEur: 50 },
      { label: T("SSI Basic Diver", "SSI Basic Diver", "SSI Basic Diver"), priceEur: 120 },
      { label: T("SSI Scuba Diver", "SSI Scuba Diver", "SSI Scuba Diver"), priceEur: 275 },
      { label: T("SSI Open Water Diver", "SSI Open Water Diver", "SSI Open Water Diver"), priceEur: 395 },
      { label: T("SSI Advanced Open Water Diver", "SSI Advanced Open Water Diver", "SSI Plongeur Avancé"), priceEur: 395 },
      { label: T("React Right", "React Right", "React Right"), priceEur: 120 },
      { label: T("SSI Diver Stress & Rescue", "SSI Diver Stress & Rescue", "SSI Stress & Rescue"), priceEur: 395 },
      { label: T("SSI Divemaster", "SSI Divemaster", "SSI Divemaster"), priceEur: 600 },
      { label: T("SSI Assistant Instructor", "SSI Assistant Instructor", "SSI Assistant Instructeur"), priceEur: 500 },
      { label: T("Specialty Instructor", "Specialty Instructor", "Instructeur de Spécialité"), priceEur: 300 },
    ],
  },
  {
    title: T("Özel hizmetler", "Extra services", "Services supplémentaires"),
    items: [
      { label: T("Nitrox tüp", "Nitrox tank", "Bouteille Nitrox"), priceEur: 5 },
      { label: T("Beceri tazeleme dalışı", "Skills refresher dive", "Plongée de remise à niveau"), priceEur: 120 },
      { label: T("Deneme dalışı", "Try dive", "Plongée découverte"), priceEur: 50 },
      { label: T("İki deneme dalışı", "Two try dives", "Deux plongées découverte"), priceEur: 90 },
      { label: T("Refakatçiler", "Companions", "Accompagnants"), priceEur: 15 },
      { label: T("Kumanya / yemek", "Lunch box / meal", "Panier-repas"), priceEur: 8 },
      { label: T("Fotoğraf / video çekimi", "Photo / video", "Photo / vidéo"), priceEur: 15 },
    ],
  },
];
