import { Outlet, useParams, Navigate } from "react-router-dom";
import { isLocale } from "@/lib/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsappFab } from "./WhatsappFab";

/** Shell for all localized pages. Guards the :lang segment. */
export function SiteLayout() {
  const { lang } = useParams();
  if (!isLocale(lang)) return <Navigate to="/tr" replace />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
