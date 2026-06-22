/**
 * Path segments per page (Turkish slugs, language-agnostic structure).
 * Full URLs are `/:lang/<segment>`. Centralized so nav, router and sitemap agree.
 */
export const SEG = {
  diving: "dalis",
  tours: "turlar",
  outdoor: "doga-etkinlikleri",
  transport: "ulasim-konaklama",
  shop: "dukkan",
  blog: "blog",
  customTours: "ozel-turlar",
  trak: "trak-experience",
  about: "hakkimizda",
  gallery: "galeri",
  reviews: "yorumlar",
  contact: "iletisim",
  faq: "sss",
} as const;
