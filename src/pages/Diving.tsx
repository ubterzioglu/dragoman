import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { DIVE_CENTER, DIVE_PRICES } from "@/content/diving";

export default function Diving() {
  const { t, pick } = useLang();

  return (
    <>
      <Seo title={t("diving.title")} description={t("diving.subtitle")} />
      <Section>
        <SectionHeading title={t("diving.title")} subtitle={t("diving.subtitle")} />

        {/* Price tables */}
        <div className="grid gap-8 md:grid-cols-2">
          {DIVE_PRICES.map((table) => (
            <div key={pick(table.title)} className="rounded-2xl border border-teal/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-teal-deep">{pick(table.title)}</h3>
              <ul className="divide-y divide-teal/10">
                {table.items.map((item) => (
                  <li key={pick(item.label)} className="flex items-center justify-between py-2">
                    <span className="text-sm text-teal">{pick(item.label)}</span>
                    <span className="text-sm font-semibold text-orange">€{item.priceEur}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-teal/60">{t("diving.priceNote")}</p>

        {/* Dive center facts — equal-width cards above the footer */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3">
          {pick(DIVE_CENTER.facts).map((f) => (
            <div key={f.label} className="rounded-xl border border-teal/10 bg-foam/40 p-4">
              <dt className="text-sm font-medium text-teal/70">{f.label}</dt>
              <dd className="text-base font-semibold text-teal-deep">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
