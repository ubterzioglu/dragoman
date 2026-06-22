import { Seo } from "@/components/seo/Seo";
import { SITE } from "@/lib/site";

/**
 * Public landing placeholder shown at the site root while the real site is
 * staged under /mvp. Renders standalone (no SiteLayout / locale tree) so it
 * stays independent of the main app routing. Remove at launch by restoring the
 * /:lang routes to the root in App.tsx.
 */
export default function ComingSoon() {
  return (
    <>
      <Seo title={`${SITE.name} — Coming Soon`} description="Çok yakında / Coming soon." />
      <main className="flex min-h-screen flex-col items-center justify-center bg-teal-deep px-6 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
          {SITE.parentBrand}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{SITE.name}</h1>
        <p className="mt-6 text-lg text-white/80">Çok yakında.</p>
        <p className="text-lg text-white/80">Coming soon.</p>
      </main>
    </>
  );
}
