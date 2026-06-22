import type { Locale } from "@/lib/site";

export type Localized<T> = Record<Locale, T>;

/** A titled item with an optional description and optional price string. */
export interface ServiceItem {
  title: Localized<string>;
  body?: Localized<string>;
  price?: Localized<string>;
}

const T = (tr: string, en: string, fr: string): Localized<string> => ({ tr, en, fr });

/**
 * Outdoor / transport / lifeguard content from dragoman-turkey.com
 * (/outdoor-activities, /tr/ulasim-konaklama, /tr/cankurtarma-merkezi).
 * Prices as published; lifeguard fees are in Turkish lira (₺).
 */
export const OUTDOOR_ACTIVITIES: ServiceItem[] = [
  {
    title: T("Çoklu Aktivite Turları", "Multi-sport Activities", "Activités multisports"),
    body: T(
      "Kayak, yürüyüş, coasteering ve daha fazlasını birleştiren paketler.",
      "Packages combining kayaking, hiking, coasteering and more.",
      "Forfaits combinant kayak, randonnée, coasteering et plus.",
    ),
  },
  {
    title: T("Yürüyüş", "Hiking", "Randonnée"),
    body: T(
      "Likya Yolu ve Kaş çevresindeki rotalarda rehberli yürüyüşler.",
      "Guided hikes on the Lycian Way and routes around Kaş.",
      "Randonnées guidées sur la Voie lycienne et autour de Kaş.",
    ),
  },
  {
    title: T("Bisiklet Turları", "Biking Tours", "Circuits à vélo"),
    body: T(
      "Kaş ve çevresinde doğa içinde bisiklet rotaları.",
      "Cycling routes through nature around Kaş.",
      "Itinéraires à vélo en pleine nature autour de Kaş.",
    ),
  },
  {
    title: T("Coasteering (Kıyı Tırmanışı)", "Coasteering", "Coasteering"),
    body: T(
      "Kayalık kıyı boyunca tırmanma, atlama ve yüzme.",
      "Climbing, jumping and swimming along the rocky coast.",
      "Escalade, sauts et nage le long de la côte rocheuse.",
    ),
  },
  {
    title: T("Mavi Turlar ve Günlük Tekne Turları", "Blue Cruises & Daily Boat Tours", "Croisières bleues et excursions en bateau"),
  },
  {
    title: T("Kültür Turları", "Culture Tours", "Tours culturels"),
  },
  {
    title: T("Doğaya Dönüş", "Back to Nature", "Retour à la nature"),
  },
];

export const TRANSPORT_ACCOMMODATION: ServiceItem[] = [
  {
    title: T("3★ Otel Konaklama", "3★ Hotel Accommodation", "Hébergement hôtel 3★"),
    body: T(
      "Kaş merkezinde 3 yıldızlı otel konaklaması.",
      "3-star hotel accommodation in central Kaş.",
      "Hébergement en hôtel 3 étoiles au centre de Kaş.",
    ),
  },
  {
    title: T("1★ Otel / Pansiyon", "1★ Hotel / Pension", "Hôtel 1★ / pension"),
    body: T(
      "Ekonomik 1 yıldızlı otel ve pansiyon seçenekleri.",
      "Budget 1-star hotel and pension options.",
      "Options économiques d'hôtel 1 étoile et pension.",
    ),
  },
  {
    title: T("Dalaman Havalimanı – Kaş", "Dalaman Airport – Kaş", "Aéroport de Dalaman – Kaş"),
    body: T("Havalimanı transfer hizmeti.", "Airport transfer service.", "Service de transfert aéroport."),
  },
  {
    title: T("Antalya Havalimanı – Kaş", "Antalya Airport – Kaş", "Aéroport d'Antalya – Kaş"),
    body: T("Havalimanı transfer hizmeti.", "Airport transfer service.", "Service de transfert aéroport."),
  },
];

export const LIFEGUARD_COURSES: ServiceItem[] = [
  {
    title: T("Bronz Cankurtaran Kursu", "Bronze Lifeguard Course", "Cours de sauveteur bronze"),
    price: T("18.000 ₺", "₺18,000", "18 000 ₺"),
  },
  {
    title: T("Gümüş Cankurtaran Kursu", "Silver Lifeguard Course", "Cours de sauveteur argent"),
    price: T("20.000 ₺", "₺20,000", "20 000 ₺"),
  },
  {
    title: T("Altın Cankurtaran Kursu", "Gold Lifeguard Course", "Cours de sauveteur or"),
    price: T("35.000 ₺", "₺35,000", "35 000 ₺"),
  },
  {
    title: T("Belge / Vize Yenilemeleri", "Certificate / Visa Renewals", "Renouvellements de certificat / visa"),
    price: T("13.000 – 14.000 ₺", "₺13,000 – 14,000", "13 000 – 14 000 ₺"),
  },
];
