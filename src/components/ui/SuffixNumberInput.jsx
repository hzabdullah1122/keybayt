"use client";

import NumberInput from "@/components/ui/NumberInput";
import FieldLabel from "@/components/ui/FieldLabel";

/** Digit-only input with a fixed unit on the right (years, min, SAR...). */
export default function SuffixNumberInput({
  label,
  suffix,
  value,
  onChange,
  placeholder,
  id,
  ariaLabel,
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <div className="flex">
        <NumberInput
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="rounded-r-none"
        />
        <span className="flex h-10 shrink-0 items-center rounded-r-lg border border-l-0 border-border bg-surface px-3.5 text-sm text-muted">
          {suffix}
        </span>
      </div>
    </div>
  );
}
