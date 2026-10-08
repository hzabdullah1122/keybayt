"use client";

import { FieldLabel } from "@/components/ui";
import { PROJECT_STATUSES } from "@/constants/projects";
import { cn } from "@/lib/utils";

/** Radio-style cards for project status. */
export default function ProjectStatusCards({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel required>Project status</FieldLabel>
      <div role="radiogroup" aria-label="Project status" className="grid gap-3 sm:grid-cols-3">
        {PROJECT_STATUSES.map((status) => {
          const on = status.value === value;
          return (
            <button
              key={status.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(status.value)}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                on ? "border-primary bg-primary-light" : "border-border bg-background hover:bg-surface",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  on ? "border-primary" : "border-placeholder",
                )}
              >
                {on && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">{status.label}</span>
                <span className="text-xs text-muted">{status.desc}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
