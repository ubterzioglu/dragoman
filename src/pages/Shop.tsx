import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { PRODUCTS } from "@/content/shop";

export default function Shop() {
  const { t, pick } = useLang();

  return (
    <>
      <Seo title={t("shop.title")} description={t("shop.subtitle")} />
      <Section>
        <SectionHeading title={t("shop.title")} subtitle={t("shop.subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={pick(p.title)} className="flex flex-col rounded-2xl border border-teal/10 p-6">
              <h3 className="mb-1 text-lg font-bold text-teal-deep">{pick(p.title)}</h3>
              <span className="mb-3 font-semibold text-orange">€{p.priceEur.toFixed(2)}</span>
              <p className="text-sm text-teal/80">{pick(p.body)}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-teal/60">{t("shop.note")}</p>
      </Section>
    </>
  );
}
