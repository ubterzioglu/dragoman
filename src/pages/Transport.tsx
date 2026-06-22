import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { TRANSPORT_ACCOMMODATION } from "@/content/services";

export default function Transport() {
  const { t, pick } = useLang();

  return (
    <>
      <Seo title={t("transport.title")} description={t("transport.subtitle")} />
      <Section>
        <SectionHeading title={t("transport.title")} subtitle={t("transport.subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2">
          {TRANSPORT_ACCOMMODATION.map((item) => (
            <article key={pick(item.title)} className="rounded-2xl border border-teal/10 p-6">
              <h3 className="mb-2 text-lg font-bold text-teal-deep">{pick(item.title)}</h3>
              {item.body && <p className="text-sm text-teal/80">{pick(item.body)}</p>}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
