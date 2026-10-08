"use client";

import { ChipGroup, FieldLabel, SegmentedControl } from "@/components/ui";
import { FURNISHED_ITEMS, FURNISHING_OPTIONS } from "@/constants/projects";

/** Furnished / Unfurnished, plus an optional "what is included" list for furnished units. */
export default function FurnishingField({ values, set, toggle }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-col gap-2">
        <FieldLabel>Furnishing</FieldLabel>
        <SegmentedControl
          label="Furnishing"
          options={FURNISHING_OPTIONS}
          value={values.furnishing}
          onChange={(v) => set("furnishing", v)}
        />
      </div>
      {values.furnishing === "furnished" && (
        <div className="flex flex-col gap-2">
          <FieldLabel hint="(optional)">What is included</FieldLabel>
          <ChipGroup
            label="Furnished items"
            options={FURNISHED_ITEMS}
            value={values.furnishedItems}
            onToggle={(v) => toggle("furnishedItems", v)}
          />
        </div>
      )}
    </div>
  );
}
