"use client";

import { motion } from "framer-motion";
import { Building2, Handshake } from "lucide-react";
import { COMPANY_TYPES } from "@/constants/projects";
import { cn } from "@/lib/utils";

const ICONS = { developer: Building2, broker: Handshake };

/** Developer / Brokerage Company tabs with a sliding active pill. */
export default function CompanyTypeTabs({ value, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Company type"
      className="inline-flex max-w-full gap-1 self-start overflow-hidden rounded-2xl border border-border bg-background p-1.5"
    >
      {COMPANY_TYPES.map((tab) => {
        const Icon = ICONS[tab.value];
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors sm:px-7",
              active ? "text-white" : "text-muted hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="company-type-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-xl bg-primary"
              />
            )}
            <Icon size={18} className="relative" />
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
