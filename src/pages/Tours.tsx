import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { TourGrid } from "@/components/tours/TourGrid";
import { TOURS } from "@/content/tours";
import { useLang } from "@/hooks/useLang";

export default function Tours() {
  const { t } = useLang();

  return (
    <>
      <Seo title={t("tours.title")} description={t("tours.subtitle")} />
      <Section>
        <SectionHeading
          title={t("tours.title")}
          subtitle={t("tours.subtitle")}
        />
        <TourGrid tours={TOURS} />
      </Section>
    </>
  );
}
