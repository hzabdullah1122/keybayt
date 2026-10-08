import { PROJECT_STATUS_BADGES } from "@/constants/projects";
import { cn } from "@/lib/utils";

/** Coloured pill for a project's workflow status (draft / in review / approved). */
export default function StatusBadge({ status }) {
  const badge = PROJECT_STATUS_BADGES[status];
  if (!badge) return null;
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        badge.className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {badge.label}
    </span>
  );
}
