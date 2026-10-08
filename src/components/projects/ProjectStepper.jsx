"use client";

import { Check } from "lucide-react";
import { PROJECT_STEPS } from "@/constants/projects";
import { cn } from "@/lib/utils";

/** Clickable step bar. Shows a tick for finished steps and highlights the current one. */
export default function ProjectStepper({ activeId, status, onSelect }) {
  const doneCount = PROJECT_STEPS.filter((s) => status[s.id]).length;

  return (
    <nav
      aria-label="Project steps"
      className="rounded-2xl border border-border bg-background p-3 sm:p-4"
    >
      <ol className="flex gap-1 overflow-x-auto">
        {PROJECT_STEPS.map((step, index) => {
          const Icon = step.icon;
          const active = step.id === activeId;
          const done = status[step.id];
          return (
            <li key={step.id} className="min-w-[132px] flex-1">
              <button
                type="button"
                onClick={() => onSelect(step.id)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  active ? "bg-primary-light" : "hover:bg-surface",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    done && "border-primary bg-primary text-white",
                    !done && active && "border-primary bg-background text-primary",
                    !done && !active && "border-border bg-background text-muted",
                  )}
                >
                  {done ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span
                    className={cn(
                      "truncate text-sm font-semibold",
                      active ? "text-primary" : "text-foreground",
                    )}
                  >
                    {index + 1}. {step.label}
                  </span>
                  <span className="truncate text-xs text-muted">{step.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="sr-only">
        {doneCount} of {PROJECT_STEPS.length} steps complete
      </p>
    </nav>
  );
}
