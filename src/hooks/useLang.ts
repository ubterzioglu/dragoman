import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { BASE_PATH, DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/site";

/**
 * Derives the active locale from the :lang route param, keeps i18next and
 * <html lang> in sync, and exposes helpers for picking localized content and
 * building locale-prefixed paths.
 */
export function useLang() {
  const { lang } = useParams();
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  /** Pick the right string/array from a Localized<T> content object. */
  const pick = <T,>(value: Record<Locale, T>): T => value[locale];

  /** Build a path under the current locale, e.g. localePath("turlar") -> /mvp/tr/turlar */
  const localePath = (path = "") => `${BASE_PATH}/${locale}${path ? `/${path}` : ""}`;

  return { locale, t, pick, localePath };
}
