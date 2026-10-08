"use client";

import NumberInput from "@/components/ui/NumberInput";
import FieldLabel from "@/components/ui/FieldLabel";

/** "From – To" pair of digit-only inputs. */
export default function RangeInput({
  label,
  required = false,
  from,
  to,
  onFromChange,
  onToChange,
  fromPlaceholder = "From",
  toPlaceholder = "To",
  ariaPrefix = label,
  error,
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div className="flex items-center gap-2">
        <NumberInput
          value={from}
          onChange={onFromChange}
          placeholder={fromPlaceholder}
          aria-label={`${ariaPrefix} ${fromPlaceholder}`}
          className={error ? "border-danger" : undefined}
        />
        <span aria-hidden="true" className="text-muted">
          –
        </span>
        <NumberInput
          value={to}
          onChange={onToChange}
          placeholder={toPlaceholder}
          aria-label={`${ariaPrefix} ${toPlaceholder}`}
          className={error ? "border-danger" : undefined}
        />
      </div>
      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}
