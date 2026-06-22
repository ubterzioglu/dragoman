import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { SEG } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t, localePath } = useLang();
  const [open, setOpen] = useState(false);

  // Top (white) tier: brand + info/secondary links, mirroring the original site.
  const topLinks = [
    { to: localePath(SEG.about), label: t("nav.about") },
    { to: localePath(SEG.blog), label: t("nav.blog") },
    { to: localePath(SEG.contact), label: t("nav.reservation") },
    { to: localePath(SEG.gallery), label: t("nav.gallery") },
    { to: localePath(SEG.reviews), label: t("nav.reviews") },
    { to: localePath(SEG.faq), label: t("nav.faq") },
  ];

  // Bottom (green) tier: primary activity links.
  const mainLinks = [
    { to: localePath(SEG.diving), label: t("nav.diving") },
    { to: localePath(SEG.tours), label: t("nav.seaKayak") },
    { to: localePath(SEG.outdoor), label: t("nav.outdoor") },
    { to: localePath(SEG.transport), label: t("nav.transport") },
    { to: localePath(SEG.lifeguard), label: t("nav.lifeguard") },
    { to: localePath(SEG.shop), label: t("nav.shop") },
  ];

  const allLinks = [...mainLinks, ...topLinks];

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      {/* Top tier — logo, secondary links, language */}
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link to={localePath()} aria-label="Dragoman Diving & Outdoors">
          <img src="/transparanlogo.png" alt="Dragoman Diving & Outdoors" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {topLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-teal/80 transition-colors hover:text-orange",
                  isActive && "text-orange",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <button
            type="button"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6 text-teal" /> : <Menu className="h-6 w-6 text-teal" />}
          </button>
        </div>
      </div>

      {/* Bottom tier — primary green nav bar */}
      <div className="hidden bg-teal lg:block">
        <nav className="container flex items-center gap-8 py-3">
          {mainLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-base font-semibold text-white/90 transition-colors hover:text-white",
                  isActive && "text-white underline underline-offset-8",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile menu — all links in one panel */}
      {open && (
        <div className="border-t border-teal/10 bg-white lg:hidden">
          <nav className="container flex flex-col gap-1 py-3">
            {allLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-base font-medium text-teal hover:bg-foam"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 px-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
