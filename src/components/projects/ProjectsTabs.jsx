"use client";

import { motion } from "framer-motion";
import { PROJECT_TABS } from "@/constants/projects";
import { cn } from "@/lib/utils";

/** Status tabs (All / Approved / Submitted / Drafts) with counts, plus an action slot on the right. */
export default function ProjectsTabs({ value, onChange, counts, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-b border-border">
      <div role="tablist" aria-label="Projects" className="flex min-w-0 gap-1 overflow-x-auto overflow-y-hidden">
        {PROJECT_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === value;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative flex shrink-0 cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors",
                active ? "text-primary" : "text-muted hover:text-foreground",
              )}
            >
              <Icon size={17} />
              {tab.label}
              <span
                className={cn(
                  "min-w-5 rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold leading-none",
                  active ? "bg-primary text-white" : "bg-surface text-muted",
                )}
              >
                {counts[tab.id] ?? 0}
              </span>
              {active && (
                <motion.span
                  layoutId="projects-tab-underline"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>
      {action && <div className="pb-2">{action}</div>}
    </div>
  );
}
