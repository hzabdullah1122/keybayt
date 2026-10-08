"use client";

import { Input } from "@/components/ui";
import FormSection from "@/components/projects/shared/FormSection";
import AmenityCards from "@/components/projects/amenities/AmenityCards";
import NearbyPlaces from "@/components/projects/amenities/NearbyPlaces";
import SubHeading from "@/components/projects/shared/SubHeading";
import { FEATURES } from "@/constants/projects";

export default function AmenitiesSection({ form }) {
  const { values, set, toggle, setNearby } = form;
  const count = values.features.length;

  return (
    <FormSection
      id="amenities"
      title="5. Features, amenities and nearby places"
      description="Customers are matched on these, so pick everything the project offers."
    >
      <div className="flex flex-col gap-4">
        <SubHeading
          title="Features and amenities"
          hint="Tap to select everything the project offers."
          badge={
            <span className="shrink-0 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {count} selected
            </span>
          }
        />
        <AmenityCards
          label="Amenities"
          options={FEATURES}
          value={values.features}
          onToggle={(v) => toggle("features", v)}
        />
        <Input
          wrapperClassName="max-w-lg"
          label="Other services or amenities"
          value={values.otherAmenities}
          onChange={(e) => set("otherAmenities", e.target.value)}
          placeholder="e.g. Walking track, maintenance service"
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <SubHeading
          title="Nearby places"
          hint="Driving time from the project in minutes. Leave empty if not nearby."
        />
        <NearbyPlaces value={values.nearby} onChange={setNearby} />
      </div>
    </FormSection>
  );
}
