"use client";

import { FieldLabel, RangeInput, SegmentedControl } from "@/components/ui";
import { PARKING_OPTIONS } from "@/constants/projects";

/** Parking availability, with the spaces-per-unit range directly underneath when available. */
export default function ParkingField({ values, set }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-col gap-2">
        <FieldLabel>Parking</FieldLabel>
        <SegmentedControl
          label="Parking"
          options={PARKING_OPTIONS}
          value={values.parking}
          onChange={(v) => set("parking", v)}
        />
      </div>
      {values.parking === "yes" && (
        <div className="max-w-[280px]">
          <RangeInput
            label="Parking spaces per unit"
            from={values.parkingSpacesFrom}
            to={values.parkingSpacesTo}
            onFromChange={(v) => set("parkingSpacesFrom", v)}
            onToChange={(v) => set("parkingSpacesTo", v)}
          />
        </div>
      )}
    </div>
  );
}
