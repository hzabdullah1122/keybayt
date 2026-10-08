"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Single-select pill toggle with a sliding active background. options: [{ value, label }]. */
export default function SegmentedControl({ options, value, onChange, label, className }) {
  const pillId = useId();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex max-w-full shrink-0 gap-1 self-start overflow-hidden rounded-2xl border border-border bg-background p-1.5",
        className,
      )}
    >
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative shrink-0 cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold transition-colors",
              on ? "text-white" : "text-muted hover:text-foreground",
            )}
          >
            {on && (
              <motion.span
                layoutId={pillId}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-xl bg-primary"
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
