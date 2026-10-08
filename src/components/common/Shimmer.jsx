import { cn } from "@/lib/utils";

/** Skeleton block. Size it with className, e.g. <Shimmer className="h-4 w-32" />. */
export function Shimmer({ className }) {
  return <div className={cn("animate-pulse rounded-md bg-border", className)} />;
}

/** Loading placeholder for lists/tables. */
export function ListShimmer({ rows = 6, className }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Shimmer key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
