import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";

export default function NotFound() {
  const { t, localePath } = useLang();

  return (
    <>
      <Seo title={t("notFound.title")} description={t("notFound.subtitle")} />
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="text-8xl font-extrabold text-teal/10">404</div>
        <h1 className="mt-4 text-3xl font-extrabold text-teal-deep">{t("notFound.title")}</h1>
        <p className="mt-3 max-w-md text-teal/70">{t("notFound.subtitle")}</p>
        <div className="mt-8">
          <Button asChild variant="teal" size="lg">
            <Link to={localePath()}>{t("notFound.cta")}</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
