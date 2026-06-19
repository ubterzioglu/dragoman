import type { ItineraryStep } from "@/content/tours";

interface ItineraryProps {
  steps: ItineraryStep[];
}

export function Itinerary({ steps }: ItineraryProps) {
  return (
    <ol className="relative ml-4 border-l-2 border-teal/20">
      {steps.map((step, index) => (
        <li key={index} className="mb-8 ml-6 last:mb-0">
          {/* Dot on the line */}
          <span className="absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-teal text-sm ring-4 ring-white">
            {step.icon}
          </span>
          <div className="rounded-xl border border-teal/10 bg-white p-4 shadow-sm">
            <h4 className="font-bold text-teal-deep">{step.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink/75">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
