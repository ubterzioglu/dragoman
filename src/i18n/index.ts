import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/site";
import tr from "./locales/tr/common.json";
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";

void i18n.use(initReactI18next).init({
  resources: {
    tr: { common: tr },
    en: { common: en },
    fr: { common: fr },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: LOCALES as unknown as string[],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
