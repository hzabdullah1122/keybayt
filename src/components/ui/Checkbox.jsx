"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Styled checkbox. `children` is the label (can contain links). */
export default function Checkbox({ checked, onChange, children, error, className }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-colors",
            "peer-focus-visible:border-primary",
            checked ? "border-primary bg-primary text-white" : error ? "border-danger" : "border-border bg-background",
          )}
        >
          {checked && <Check size={13} strokeWidth={3.5} />}
        </span>
        <span className="leading-snug">{children}</span>
      </label>
      {error && <p className="pl-7 text-xs text-danger">{error}</p>}
    </div>
  );
}
