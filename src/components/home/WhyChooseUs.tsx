import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { TOURS } from "@/content/tours";
import { useLang } from "@/hooks/useLang";

export function WhyChooseUs() {
  const { t, pick } = useLang();
  const benefits = pick(TOURS[0].whyChoose);

  return (
    <Section className="bg-sand">
      <SectionHeading
        title={t("whyChoose.title")}
        subtitle={t("whyChoose.subtitle")}
      />
      <ul className="flex flex-col gap-3">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl border border-teal/10 bg-white px-4 py-3 shadow-sm sm:px-5 sm:py-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            <span className="text-sm leading-relaxed text-ink/80">{benefit}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
