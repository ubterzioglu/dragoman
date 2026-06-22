import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceCategoryList } from "@/components/services/ServiceCategoryList";
import { useLang } from "@/hooks/useLang";
import { TRANSPORT_ACCOMMODATION } from "@/content/services";

export default function Transport() {
  const { t } = useLang();

  return (
    <>
      <Seo title={t("transport.title")} description={t("transport.subtitle")} />
      <Section>
        <SectionHeading title={t("transport.title")} subtitle={t("transport.subtitle")} />
        <ServiceCategoryList categories={TRANSPORT_ACCOMMODATION} />
        <p className="mt-12 text-center text-sm text-teal/60">{t("transport.priceNote")}</p>
      </Section>
    </>
  );
}
