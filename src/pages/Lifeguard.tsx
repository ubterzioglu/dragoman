import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { LIFEGUARD_COURSES } from "@/content/services";

export default function Lifeguard() {
  const { t, pick } = useLang();

  return (
    <>
      <Seo title={t("lifeguard.title")} description={t("lifeguard.subtitle")} />
      <Section>
        <SectionHeading title={t("lifeguard.title")} subtitle={t("lifeguard.subtitle")} />
        <ul className="mx-auto max-w-2xl divide-y divide-teal/10 rounded-2xl border border-teal/10">
          {LIFEGUARD_COURSES.map((item) => (
            <li key={pick(item.title)} className="flex items-center justify-between gap-4 p-4">
              <span className="font-medium text-teal-deep">{pick(item.title)}</span>
              {item.price && <span className="shrink-0 font-semibold text-orange">{pick(item.price)}</span>}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
