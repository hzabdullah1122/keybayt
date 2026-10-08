"use client";

import { cn } from "@/lib/utils";

/**
 * Multi-select pills. options: [{ value, label }], value: string[],
 * onToggle(value) is called for the clicked chip.
 */
export default function ChipGroup({ options, value = [], onToggle, label, className }) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2.5", className)}>
      {options.map((option) => {
        const on = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(option.value)}
            className={cn(
              "inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors",
              on
                ? "border-primary bg-primary-light text-primary"
                : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-surface",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
