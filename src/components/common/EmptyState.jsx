import { Inbox, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shown when an API returns no data.
 * `filtered` switches to the "no results for your search/filter" variant.
 */
export default function EmptyState({
  icon,
  title,
  description,
  filtered = false,
  action,
  className,
}) {
  const Icon = icon || (filtered ? SearchX : Inbox);
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-1 flex-col items-center justify-center gap-2.5 px-4 py-12 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface">
        <Icon size={22} className="text-placeholder" />
      </div>
      <p className="text-sm font-bold">
        {title || (filtered ? "No results found" : "Nothing here yet")}
      </p>
      <p className="max-w-xs text-xs text-muted">
        {description ||
          (filtered
            ? "Nothing matches your search or filters. Try something different."
            : "Data will show up here once it is added.")}
      </p>
      {action}
    </div>
  );
}
