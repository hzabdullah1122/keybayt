"use client";

import { FieldLabel, NumberInput, RangeInput } from "@/components/ui";
import { formatNumber, isRangeInvalid } from "@/lib/projectMetrics";

const RANGE_ERROR = "Max must be higher than min.";

/** Price / area / units / rooms for ONE selected project type. */
export default function UnitTypeCard({ type, unit, onChange }) {
  const lower = type.label.toLowerCase();
  const hasRooms = type.value !== "land";
  const minP = unit.minPrice ? Number(unit.minPrice) : null;
  const maxP = unit.maxPrice ? Number(unit.maxPrice) : null;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-5 py-3.5">
        <span className="text-[15px] font-semibold text-foreground">{type.label}</span>
        <span className="text-sm text-muted">
          SAR {formatNumber(minP)} – {formatNumber(maxP)}
        </span>
      </div>

      <div className="grid gap-x-5 gap-y-5 p-5 md:grid-cols-2 2xl:grid-cols-3">
        <RangeInput
          label="Price range (SAR)"
          required
          ariaPrefix={`${lower} price`}
          from={unit.minPrice}
          to={unit.maxPrice}
          onFromChange={(v) => onChange("minPrice", v)}
          onToChange={(v) => onChange("maxPrice", v)}
          fromPlaceholder="Min"
          toPlaceholder="Max"
          error={isRangeInvalid(unit.minPrice, unit.maxPrice) ? RANGE_ERROR : undefined}
        />
        <RangeInput
          label="Area range (m²)"
          required
          ariaPrefix={`${lower} area`}
          from={unit.minArea}
          to={unit.maxArea}
          onFromChange={(v) => onChange("minArea", v)}
          onToChange={(v) => onChange("maxArea", v)}
          fromPlaceholder="Min"
          toPlaceholder="Max"
          error={isRangeInvalid(unit.minArea, unit.maxArea) ? RANGE_ERROR : undefined}
        />

        <div className="flex min-w-0 flex-col gap-1.5">
          <FieldLabel required>Units (total / available)</FieldLabel>
          <div className="flex items-center gap-2">
            <NumberInput
              value={unit.total}
              onChange={(v) => onChange("total", v)}
              placeholder="Total"
              aria-label={`Total ${lower} units`}
            />
            <span aria-hidden="true" className="text-muted">
              /
            </span>
            <NumberInput
              value={unit.available}
              onChange={(v) => onChange("available", v)}
              placeholder="Available"
              aria-label={`Available ${lower} units`}
            />
          </div>
        </div>

        {hasRooms && (
          <>
            <RangeInput
              label="Bedrooms"
              required
              ariaPrefix={`${lower} bedrooms`}
              from={unit.bedFrom}
              to={unit.bedTo}
              onFromChange={(v) => onChange("bedFrom", v)}
              onToChange={(v) => onChange("bedTo", v)}
            />
            <RangeInput
              label="Bathrooms"
              ariaPrefix={`${lower} bathrooms`}
              from={unit.bathFrom}
              to={unit.bathTo}
              onFromChange={(v) => onChange("bathFrom", v)}
              onToChange={(v) => onChange("bathTo", v)}
            />
          </>
        )}
      </div>
    </div>
  );
}
