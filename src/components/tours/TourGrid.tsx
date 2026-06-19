import type { Tour } from "@/content/tours";
import { TourCard } from "@/components/tours/TourCard";

interface TourGridProps {
  tours: Tour[];
}

export function TourGrid({ tours }: TourGridProps) {
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {tours.map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </div>
  );
}
