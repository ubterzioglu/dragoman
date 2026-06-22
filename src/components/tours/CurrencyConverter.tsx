import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { useLang } from "@/hooks/useLang";

/**
 * Lightweight currency converter for tour prices. Rates are PLACEHOLDER static
 * values (base = EUR); replace `RATES` with a live FX feed later. Tour prices on
 * the site are in EUR, so this helps guests see a rough local equivalent.
 */
const RATES: Record<string, { label: string; perEur: number }> = {
  EUR: { label: "€ EUR", perEur: 1 },
  TRY: { label: "₺ TRY", perEur: 35 },
  USD: { label: "$ USD", perEur: 1.08 },
  GBP: { label: "£ GBP", perEur: 0.85 },
  RUB: { label: "₽ RUB", perEur: 98 },
};

const CURRENCIES = Object.keys(RATES);

export function CurrencyConverter() {
  const { t } = useLang();
  const [amount, setAmount] = useState(60); // Kekova Classic base price
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("TRY");

  // Convert via EUR as the pivot.
  const inEur = amount / RATES[from].perEur;
  const result = inEur * RATES[to].perEur;
  const formatted = result.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="mx-auto mb-10 max-w-2xl rounded-2xl border border-teal/10 bg-white p-5 shadow-[0_10px_30px_rgba(1,68,57,0.08)]">
      <div className="mb-1 text-sm font-bold uppercase tracking-wide text-orange">
        {t("currency.eyebrow")}
      </div>
      <h3 className="mb-4 text-lg font-bold text-teal-deep">{t("currency.title")}</h3>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-28">
          <label className="mb-1 block text-xs font-semibold text-teal/70">{t("currency.amount")}</label>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-xl border border-teal/15 px-3 py-2.5 outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
          />
        </div>

        <div className="min-w-24">
          <label className="mb-1 block text-xs font-semibold text-teal/70">{t("currency.from")}</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-xl border border-teal/15 px-3 py-2.5 outline-none focus:border-orange"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{RATES[c].label}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swap}
          aria-label={t("currency.swap")}
          className="mb-0.5 rounded-xl border border-teal/15 p-2.5 text-teal transition-colors hover:bg-foam"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </button>

        <div className="min-w-24">
          <label className="mb-1 block text-xs font-semibold text-teal/70">{t("currency.to")}</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-xl border border-teal/15 px-3 py-2.5 outline-none focus:border-orange"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{RATES[c].label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-foam px-4 py-3 text-center">
        <span className="text-sm text-teal/70">
          {amount.toLocaleString("tr-TR")} {from} ≈{" "}
        </span>
        <span className="text-lg font-extrabold text-teal-deep">
          {formatted} {to}
        </span>
      </div>

      <p className="mt-2 text-center text-xs text-teal/40">{t("currency.note")}</p>
    </div>
  );
}
