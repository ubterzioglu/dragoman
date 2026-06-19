import { Link, useParams } from "react-router-dom";
import { CheckCircle2, MapPin, Clock, Waves, TrendingUp, Euro } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { Itinerary } from "@/components/tours/Itinerary";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { getTour } from "@/content/tours";
import { useLang } from "@/hooks/useLang";
import { SEG } from "@/lib/routes";
import { buildWhatsappLink } from "@/lib/whatsapp";

export default function TourDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, pick, localePath } = useLang();

  const tour = getTour(slug ?? "");

  if (!tour) {
    return (
      <Section>
        <p className="text-lg text-ink/70">Tour not found.</p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link to={localePath(SEG.tours)}>{t("nav.tours")}</Link>
        </Button>
      </Section>
    );
  }

  const title = pick(tour.title);
  const tagline = pick(tour.tagline);
  const highlights = pick(tour.highlights);
  const included = pick(tour.included);
  const itinerary = pick(tour.itinerary);
  const contactPath = `${localePath(SEG.contact)}?tour=${tour.slug}`;
  const whatsappHref = buildWhatsappLink({ tourTitle: title });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: tagline,
    offers: {
      "@type": "Offer",
      price: tour.priceEur,
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <Seo title={title} description={tagline} jsonLd={jsonLd} />

      {/* Hero band */}
      <div className="hero-gradient relative overflow-hidden pb-12 pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${tour.heroImage})` }}
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/90">
            {t(`level.${tour.level}`)}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">{tagline}</p>

          {/* Key meta */}
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Waves className="h-4 w-4" />
              {tour.distanceKm} {t("common.km")}
            </span>
            {tour.hikingKm && (
              <span className="inline-flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {tour.hikingKm} {t("common.hikingKm")}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t("common.departure")}: {tour.departure}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t("common.arrival")}: {tour.arrival}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {tour.departure} → {tour.arrival}
            </span>
            <span className="inline-flex items-center gap-2 font-bold text-orange-soft">
              <Euro className="h-4 w-4" />
              {t("common.from")} €{tour.priceEur}
              {tour.priceFromKalkanEur && (
                <span className="ml-1 font-normal text-white/70">
                  (Kalkan: €{tour.priceFromKalkanEur})
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <Section>
        <SectionHeading title={t("common.highlights")} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Route */}
      <Section className="bg-foam/40">
        <SectionHeading title={t("common.route")} />
        <p className="text-sm text-ink/75">{tour.routeStops.join(" → ")}</p>
      </Section>

      {/* Itinerary */}
      <Section>
        <SectionHeading title={t("common.itinerary")} />
        <Itinerary steps={itinerary} />
      </Section>

      {/* What's included */}
      <Section className="bg-foam/40">
        <SectionHeading title={t("common.included")} />
        <ul className="space-y-2">
          {included.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-ink/80">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-2xl border border-teal/10 bg-teal p-8 text-center shadow-lg">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            {t("common.bookNow")}
          </h2>
          <p className="mt-2 text-white/80">{tagline}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="primary">
              <Link to={contactPath}>{t("common.bookNow")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {t("common.askQuestion")}
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
