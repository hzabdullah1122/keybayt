"use client";

import FieldLabel from "@/components/ui/FieldLabel";
import NumberInput from "@/components/ui/NumberInput";
import SearchableSelect from "@/components/ui/SearchableSelect";

/**
 * Digit-only input joined with a unit dropdown (e.g. Years / Months).
 * units: [{ value, label }]  onChange(number string)  onUnitChange(unit value)
 */
export default function UnitSelectInput({
  label,
  id,
  value,
  onChange,
  unit,
  onUnitChange,
  units,
  placeholder,
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
          className="rounded-r-none"
        />
        <SearchableSelect
          options={units}
          value={unit}
          onChange={onUnitChange}
          searchPlaceholder="Search..."
          className="w-[116px] shrink-0"
          triggerClassName="rounded-l-none border-l-0 bg-surface font-medium text-foreground hover:bg-primary-light"
          // Opens upward, aligned to the right edge so it never hangs outside the card.
          menuClassName="bottom-full left-auto right-0 top-auto mb-1 mt-0"
        />
      </div>
    </div>
  );
}
