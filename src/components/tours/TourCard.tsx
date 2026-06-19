import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Waves, TrendingUp, ChevronDown, MapPin, Check, Star } from "lucide-react";
import type { Tour } from "@/content/tours";
import { useLang } from "@/hooks/useLang";
import { SEG } from "@/lib/routes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TourCard({ tour }: { tour: Tour }) {
  const { t, pick, localePath } = useLang();
  const [open, setOpen] = useState(false);
  const detailPath = localePath(`${SEG.tours}/${tour.slug}`);
  const panelId = `tour-panel-${tour.slug}`;

  const toggle = () => setOpen((v) => !v);

  return (
    <Card className="flex flex-col overflow-hidden p-0 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(1,68,57,0.14)]">
      {/* Clickable region — tap to expand/collapse the card in place */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
      >
        <div className="hero-gradient relative aspect-[16/10] w-full">
          <img
            src={tour.heroImage}
            alt={pick(tour.title)}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-teal-deep">
            {t(`level.${tour.level}`)}
          </span>
        </div>

        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold text-teal-deep">{pick(tour.title)}</h3>
            <ChevronDown
              aria-hidden="true"
              className={`mt-1 h-5 w-5 shrink-0 text-teal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </div>
          <p className="mt-1 text-sm text-ink/75">{pick(tour.tagline)}</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-teal">
            <span className="inline-flex items-center gap-1"><Waves className="h-4 w-4" /> {tour.distanceKm} {t("common.km")}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.departure}</span>
            {tour.hikingKm && (
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-4 w-4" /> {tour.hikingKm} {t("common.hikingKm")}</span>
            )}
          </div>
        </div>
      </div>

      {/* Expanding detail panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-teal/10 px-6 pb-6 pt-5 text-sm">
              <div>
                <div className="mb-1 flex items-center gap-1.5 font-bold text-teal-deep">
                  <MapPin className="h-4 w-4 text-orange" /> {t("common.route")}
                </div>
                <p className="text-ink/75">{tour.routeStops.join(" · ")}</p>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1.5 font-bold text-teal-deep">
                  <Star className="h-4 w-4 text-orange" /> {t("common.highlights")}
                </div>
                <ul className="space-y-1 text-ink/75">
                  {pick(tour.highlights).map((h, i) => (
                    <li key={i} className="flex gap-1.5"><span className="text-orange">•</span> {h}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1.5 font-bold text-teal-deep">
                  <Check className="h-4 w-4 text-orange" /> {t("common.included")}
                </div>
                <ul className="space-y-1 text-ink/75">
                  {pick(tour.included).map((it, i) => (
                    <li key={i} className="flex gap-1.5"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" /> {it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price + detail link — always visible, anchored to the card bottom */}
      <div className="mt-auto flex items-center justify-between border-t border-teal/10 px-6 py-4">
        <div className="text-lg font-extrabold text-orange">
          {t("common.from")} €{tour.priceEur}
          <span className="ml-1 text-xs font-medium text-ink/60">/ {t("common.perPerson")}</span>
        </div>
        <Button asChild size="sm" variant="outline">
          {/* stopPropagation so following the link never toggles the expand state */}
          <Link to={detailPath} onClick={(e) => e.stopPropagation()}>{t("common.viewDetails")}</Link>
        </Button>
      </div>
    </Card>
  );
}
