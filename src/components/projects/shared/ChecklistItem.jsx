import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Round tick + label (+ optional weight). Used in readiness/required lists. */
export default function ChecklistItem({ label, done, weight }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-foreground">
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          done ? "border-primary bg-primary text-white" : "border-placeholder",
        )}
      >
        {done && <Check size={12} strokeWidth={3.5} />}
      </span>
      <span className={cn("flex-1", done && "text-muted")}>{label}</span>
      {weight !== undefined && <span className="text-xs font-semibold text-muted">{weight}%</span>}
    </li>
  );
}
