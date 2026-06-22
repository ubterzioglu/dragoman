import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceCategoryList } from "@/components/services/ServiceCategoryList";
import { useLang } from "@/hooks/useLang";
import { OUTDOOR_ACTIVITIES } from "@/content/services";

export default function Outdoor() {
  const { t } = useLang();

  return (
    <>
      <Seo title={t("outdoor.title")} description={t("outdoor.subtitle")} />
      <Section>
        <SectionHeading title={t("outdoor.title")} subtitle={t("outdoor.subtitle")} />
        <ServiceCategoryList categories={OUTDOOR_ACTIVITIES} />
        <p className="mt-12 text-center text-sm text-teal/60">{t("outdoor.priceNote")}</p>
      </Section>
    </>
  );
}
