import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { SEG } from "@/lib/routes";
import { SITE } from "@/lib/site";

export function Footer() {
  const { t, localePath } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal-deep text-white/85">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <img src="/logo.png" alt="Dragoman SeaKayak" className="mb-4 h-12 w-auto brightness-0 invert" />
          <p className="max-w-xs text-sm opacity-80">{t("footer.tagline")}</p>
          <div className="mt-4 flex gap-3">
            <a href={SITE.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 p-2 transition-colors hover:bg-orange hover:border-orange">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={SITE.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 p-2 transition-colors hover:bg-orange hover:border-orange">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email" className="rounded-full border border-white/25 p-2 transition-colors hover:bg-orange hover:border-orange">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">{t("footer.quickLinks")}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={localePath(SEG.tours)} className="hover:text-orange-soft">{t("nav.tours")}</Link></li>
            <li><Link to={localePath(SEG.customTours)} className="hover:text-orange-soft">{t("nav.customTours")}</Link></li>
            <li><Link to={localePath(SEG.about)} className="hover:text-orange-soft">{t("nav.about")}</Link></li>
            <li><Link to={localePath(SEG.faq)} className="hover:text-orange-soft">{t("nav.faq")}</Link></li>
            <li><Link to={localePath(SEG.contact)} className="hover:text-orange-soft">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">{t("contact.title")}</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-orange-soft">{SITE.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <a href={`mailto:${SITE.email}`} className="hover:text-orange-soft">{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm opacity-70">
        © {year} {SITE.name} — {t("footer.rights")}
      </div>
    </footer>
  );
}
