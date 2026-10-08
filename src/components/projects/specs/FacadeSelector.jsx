"use client";

import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import { FieldLabel } from "@/components/ui";
import { FACADES } from "@/constants/projects";
import { cn } from "@/lib/utils";

const ARROWS = {
  n: ArrowUp,
  ne: ArrowUpRight,
  e: ArrowRight,
  se: ArrowDownRight,
  s: ArrowDown,
  sw: ArrowDownLeft,
  w: ArrowLeft,
  nw: ArrowUpLeft,
};

// Clockwise from north so the order reads naturally.
const ORDER = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

/** Multi-select cards for the directions the project faces (arrow + name, border/bg highlight). */
export default function FacadeSelector({ value, onToggle }) {
  const options = ORDER.map((id) => FACADES.find((f) => f.value === id));

  return (
    <div className="flex flex-col gap-2.5">
      <FieldLabel hint="(choose all that apply)">Facade direction</FieldLabel>
      <div
        role="group"
        aria-label="Facade direction"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {options.map((option) => {
          const Icon = ARROWS[option.value];
          const on = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option.value)}
              className={cn(
                "flex h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 text-sm font-medium transition-colors",
                on
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-surface",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                  on ? "bg-primary text-white" : "bg-surface text-muted",
                )}
              >
                <Icon size={16} />
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
