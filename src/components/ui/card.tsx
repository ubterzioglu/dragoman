import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-teal/10 bg-white p-7 shadow-[0_10px_30px_rgba(1,68,57,0.08)] transition-all",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
