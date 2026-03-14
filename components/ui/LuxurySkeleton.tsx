import { cn } from "@/lib/utils";

interface LuxurySkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "image";
  lines?: number;
}

/**
 * Luxury shimmer skeleton — matches the dark aesthetic, no generic grey spinners.
 */
export function LuxurySkeleton({ className, variant = "text", lines = 1 }: LuxurySkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("luxury-card p-6 space-y-4 animate-pulse", className)}>
        <div className="h-4 w-2/3 rounded-lg shimmer-bg" />
        <div className="h-3 w-full rounded-lg shimmer-bg" />
        <div className="h-3 w-4/5 rounded-lg shimmer-bg" />
        <div className="h-8 w-1/3 rounded-lg shimmer-bg mt-4" />
      </div>
    );
  }

  if (variant === "circle") {
    return (
      <div
        className={cn("rounded-full shimmer-bg", className ?? "h-12 w-12")}
        aria-hidden="true"
      />
    );
  }

  if (variant === "image") {
    return (
      <div
        className={cn("rounded-xl shimmer-bg", className ?? "h-48 w-full")}
        aria-hidden="true"
      />
    );
  }

  // Text skeleton — multiple lines
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 rounded-lg shimmer-bg",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Full-page luxury loading skeleton */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-obsidian p-8 space-y-8 animate-fade-in">
      <LuxurySkeleton variant="text" className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <LuxurySkeleton key={i} variant="card" />
        ))}
      </div>
    </div>
  );
}
