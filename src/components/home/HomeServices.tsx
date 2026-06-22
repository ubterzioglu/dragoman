import { Link } from "react-router-dom";
import { Waves, Sailboat, Mountain } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { SEG } from "@/lib/routes";

/** Overview of the four core service areas, linking into each section. */
export function HomeServices() {
  const { t, localePath } = useLang();

  const services = [
    { icon: Waves, to: SEG.diving, label: t("homeServices.diving"), desc: t("homeServices.divingDesc") },
    { icon: Sailboat, to: SEG.tours, label: t("homeServices.seaKayak"), desc: t("homeServices.seaKayakDesc") },
    { icon: Mountain, to: SEG.outdoor, label: t("homeServices.outdoor"), desc: t("homeServices.outdoorDesc") },
  ];

  return (
    <Section className="bg-foam/40">
      <SectionHeading
        eyebrow={t("homeServices.eyebrow")}
        title={t("homeServices.title")}
        subtitle={t("homeServices.subtitle")}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, to, label, desc }) => (
          <Link
            key={to}
            to={localePath(to)}
            className="group flex flex-col rounded-2xl border border-teal/10 bg-white p-6 shadow-[0_10px_30px_rgba(1,68,57,0.06)] transition-transform hover:-translate-y-1"
          >
            <Icon className="mb-3 h-8 w-8 text-orange" aria-hidden="true" />
            <h3 className="mb-1 text-lg font-bold text-teal-deep group-hover:text-orange">{label}</h3>
            <p className="text-sm text-teal/75">{desc}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
