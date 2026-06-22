import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { OUTDOOR_ACTIVITIES } from "@/content/services";

export default function Outdoor() {
  const { t, pick } = useLang();

  return (
    <>
      <Seo title={t("outdoor.title")} description={t("outdoor.subtitle")} />
      <Section>
        <SectionHeading title={t("outdoor.title")} subtitle={t("outdoor.subtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OUTDOOR_ACTIVITIES.map((item) => (
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
