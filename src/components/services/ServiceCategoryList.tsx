import type { ServiceCategory } from "@/content/services";
import { useLang } from "@/hooks/useLang";

interface ServiceCategoryListProps {
  categories: ServiceCategory[];
}

/**
 * Renders titled categories of offerings using the diving-page aesthetic:
 * each item shows a facts grid (label/value), an orange price badge and a
 * description, with optional category footnotes.
 */
export function ServiceCategoryList({ categories }: ServiceCategoryListProps) {
  const { pick } = useLang();

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <section key={pick(category.title)}>
          <h3 className="mb-6 text-2xl font-bold text-teal-deep">{pick(category.title)}</h3>

          <div className="grid gap-6 md:grid-cols-2">
            {category.items.map((item) => (
              <article
                key={pick(item.title)}
                className="flex flex-col rounded-2xl border border-teal/10 p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h4 className="text-lg font-bold text-teal-deep">{pick(item.title)}</h4>
                  {item.price && (
                    <span className="shrink-0 rounded-full bg-orange/10 px-3 py-1 text-sm font-semibold text-orange">
                      {pick(item.price)}
                    </span>
                  )}
                </div>

                {item.facts && item.facts.length > 0 && (
                  <dl className="mb-4 grid gap-2 sm:grid-cols-2">
                    {item.facts.map((fact) => (
                      <div
                        key={pick(fact.label)}
                        className="rounded-xl border border-teal/10 bg-foam/40 p-3"
                      >
                        <dt className="text-xs font-medium text-teal/70">{pick(fact.label)}</dt>
                        <dd className="text-sm font-semibold text-teal-deep">{pick(fact.value)}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {item.body && <p className="text-sm leading-relaxed text-teal/80">{pick(item.body)}</p>}
              </article>
            ))}
          </div>

          {category.notes && category.notes.length > 0 && (
            <ul className="mt-6 space-y-1.5 text-sm text-teal/60">
              {category.notes.map((note) => (
                <li key={pick(note)}>• {pick(note)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
