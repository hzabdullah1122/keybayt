"use client";

import { cn } from "@/lib/utils";

/**
 * Multi-select icon cards. options: [{ value, label, icon }], value: string[].
 * Selected = border + background + icon colour only (no tick), so the layout never shifts.
 */
export default function AmenityCards({ options, value, onToggle, label }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const on = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(option.value)}
            className={cn(
              "flex h-14 cursor-pointer items-center gap-3 rounded-xl border px-3.5 text-left text-sm font-medium transition-colors",
              on
                ? "border-primary bg-primary-light text-primary"
                : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-surface",
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                on ? "bg-primary text-white" : "bg-surface text-muted",
              )}
            >
              <Icon size={18} />
            </span>
            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
