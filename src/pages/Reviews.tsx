import { useState } from "react";
import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { Star } from "lucide-react";

interface Review {
  author: string;
  country: string;
  flag: string;
  lang: string;
  rating: number;
  date: string;
  text: string;
  featured: boolean;
}

const REVIEWS: Review[] = [
  {
    author: "Sophie M.",
    country: "France",
    flag: "🇫🇷",
    lang: "FR",
    rating: 5,
    date: "2024-09-15",
    text: "Une expérience absolument magique ! Nous avons pagayé au-dessus de la cité engloutie — c'est difficile à décrire. Notre guide était incroyable, plein de connaissances sur l'histoire lycienne. Le déjeuner dans le restaurant au bord de l'eau à Simena était délicieux. Je recommande vivement !",
    featured: true,
  },
  {
    author: "James R.",
    country: "United Kingdom",
    flag: "🇬🇧",
    lang: "EN",
    rating: 5,
    date: "2024-08-22",
    text: "Absolutely brilliant day out. We did the Kekova West tour and it was the highlight of our whole Turkey holiday. The guides were professional, safety-conscious, and really knowledgeable. The scenery is otherworldly — crystal-clear water, ancient ruins, stunning coastline. Would go back in a heartbeat.",
    featured: true,
  },
  {
    author: "Markus K.",
    country: "Germany",
    flag: "🇩🇪",
    lang: "DE",
    rating: 5,
    date: "2024-08-10",
    text: "Traumhafter Ausflug! Wir haben die Kekova Classic Tour gemacht und waren begeistert. Die Guides waren sehr professionell und sicherheitsbewusst. Das Paddeln über die versunkene Stadt war ein unvergessliches Erlebnis. Das Mittagessen in Simena war auch sehr lecker. Absolute Empfehlung!",
    featured: false,
  },
  {
    author: "Ayşe Y.",
    country: "Türkiye",
    flag: "🇹🇷",
    lang: "TR",
    rating: 5,
    date: "2024-07-30",
    text: "Eşimle birlikte Kekova Classic turuna katıldık. Rehberimiz hem bilgiliydi hem de çok eğlenceliydi. Batık şehrin üzerinden kürek çekmek gerçekten inanılmaz bir deneyimdi. Güvenlik konusunda çok titiz davranıldı, bu bizi çok rahatlattı. Kesinlikle tekrar gideceğiz!",
    featured: true,
  },
  {
    author: "Elena B.",
    country: "Italy",
    flag: "🇮🇹",
    lang: "EN",
    rating: 5,
    date: "2024-07-18",
    text: "We booked the private tour for our family of 5 (including two kids aged 8 and 11). The team was fantastic — they adjusted the pace perfectly for the children and made everyone feel safe and excited. Kekova is genuinely one of the most beautiful places I have ever been. Thank you!",
    featured: false,
  },
  {
    author: "Pierre D.",
    country: "France",
    flag: "🇫🇷",
    lang: "FR",
    rating: 4,
    date: "2024-06-25",
    text: "Très belle excursion sur la côte lycienne. Nous avons fait le Kekova East jusqu'à Andriake — c'est long mais magnifique. On a même aperçu des tortues de mer ! Le guide était compétent et rassurant. Petit bémol : le départ est très tôt à 07h30 mais c'est inévitable pour avoir le temps de tout faire.",
    featured: false,
  },
  {
    author: "Lena S.",
    country: "Netherlands",
    flag: "🇳🇱",
    lang: "EN",
    rating: 5,
    date: "2024-06-05",
    text: "We did the Kekova West tour and it was extraordinary. Paddling past ancient Lycian tombs, snorkelling above sunken ruins, lunching at a fisherman's house — every single moment was memorable. The guides were warm, professional, and clearly passionate about the region.",
    featured: true,
  },
  {
    author: "Carlos M.",
    country: "Spain",
    flag: "🇪🇸",
    lang: "EN",
    rating: 4,
    date: "2024-05-20",
    text: "Great experience overall. The Classic tour was perfect for our group of mixed experience levels. The guide was patient with beginners and kept the pace comfortable. The scenery around Kekova is breathtaking. Small group size made it feel very personal.",
    featured: false,
  },
  {
    author: "Mehmet A.",
    country: "Türkiye",
    flag: "🇹🇷",
    lang: "TR",
    rating: 5,
    date: "2024-05-10",
    text: "Kekova East turuna katıldım ve harika bir deneyim yaşadım. Rehberlerimiz hem profesyonel hem de bölgeyi çok iyi tanıyan kişilerdi. Deniz kaplumbağalarını görmek gerçekten büyüleyiciydi. Tüm güvenlik tedbirleri eksiksiz alınmıştı. Tekrar katılmak isterim.",
    featured: false,
  },
  {
    author: "Anna L.",
    country: "Sweden",
    flag: "🇸🇪",
    lang: "EN",
    rating: 5,
    date: "2024-04-28",
    text: "One of the best experiences of my life. Kayaking over the sunken Lycian city with such clear water that you can see everything beneath you — it is surreal. Our guide told fascinating stories about the history. Small group of 8 people felt very personal and safe. Highly recommended.",
    featured: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= rating ? "fill-orange text-orange" : "fill-transparent text-teal/20"}`}
        />
      ))}
    </div>
  );
}

const ALL_LANGS = Array.from(new Set(REVIEWS.map((r) => r.lang))).sort();

export default function Reviews() {
  const { t } = useLang();

  const [filterLang, setFilterLang] = useState<string>("ALL");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const sorted = [...REVIEWS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const filtered = sorted.filter((r) => {
    if (filterLang !== "ALL" && r.lang !== filterLang) return false;
    if (showFeaturedOnly && !r.featured) return false;
    return true;
  });

  return (
    <>
      <Seo title={t("reviews.title")} description={t("reviews.subtitle")} />

      <Section>
        <SectionHeading
          eyebrow={t("reviews.eyebrow")}
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
        />

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-teal/60">{t("reviews.filterByLang")}:</span>
          <button
            onClick={() => setFilterLang("ALL")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filterLang === "ALL"
                ? "bg-teal text-white"
                : "border border-teal/20 text-teal hover:bg-foam"
            }`}
          >
            {t("reviews.filterAll")}
          </button>
          {ALL_LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilterLang(lang)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                filterLang === lang
                  ? "bg-teal text-white"
                  : "border border-teal/20 text-teal hover:bg-foam"
              }`}
            >
              {lang}
            </button>
          ))}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`ml-auto rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              showFeaturedOnly
                ? "bg-orange text-white"
                : "border border-orange/30 text-orange hover:bg-orange/5"
            }`}
          >
            {t("reviews.filterFeatured")}
          </button>
        </div>

        {/* Review cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((review, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-2xl border bg-white p-6 shadow-[0_10px_30px_rgba(1,68,57,0.08)] transition-all ${
                review.featured ? "border-orange/30 ring-1 ring-orange/20" : "border-teal/10"
              }`}
            >
              {review.featured && (
                <div className="mb-3 inline-flex w-fit rounded-full bg-orange/10 px-3 py-0.5 text-xs font-bold text-orange">
                  {t("reviews.featuredBadge")}
                </div>
              )}

              <StarRating rating={review.rating} />

              <p className="mt-3 flex-1 text-sm leading-relaxed text-teal/80">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-teal/5 pt-4">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-teal-deep">
                    <span>{review.flag}</span>
                    <span>{review.author}</span>
                  </div>
                  <div className="text-xs text-teal/50">
                    {review.country} &middot; {review.lang}
                  </div>
                </div>
                <div className="text-xs text-teal/40">
                  {new Date(review.date).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-teal/50">{t("common.loading")}</p>
        )}
      </Section>
    </>
  );
}
