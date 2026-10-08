"use client";

import { SuffixNumberInput } from "@/components/ui";
import { NEARBY_PLACES } from "@/constants/projects";

/** Driving minutes to common places, one compact card each. Leave empty if not nearby. */
export default function NearbyPlaces({ value, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
      {NEARBY_PLACES.map((place) => {
        const Icon = place.icon;
        return (
          <div
            key={place.value}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              <Icon size={19} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="truncate text-sm font-medium text-foreground">{place.label}</span>
              <SuffixNumberInput
                id={`near-${place.value}`}
                ariaLabel={`${place.label} driving time in minutes`}
                suffix="min"
                placeholder="e.g. 5"
                value={value[place.value] ?? ""}
                onChange={(v) => onChange(place.value, v)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
