"use client";

import { RangeInput, SearchableSelect } from "@/components/ui";
import FormSection from "@/components/projects/shared/FormSection";
import FacadeSelector from "@/components/projects/specs/FacadeSelector";
import FurnishingField from "@/components/projects/specs/FurnishingField";
import ParkingField from "@/components/projects/specs/ParkingField";
import WarrantyFields from "@/components/projects/specs/WarrantyFields";
import { PROPERTY_AGES } from "@/constants/projects";

/** Reusable binding of a RangeInput to `${name}From` / `${name}To` form keys. */
function FormRange({ form, name, label, ...props }) {
  const { values, set } = form;
  return (
    <RangeInput
      label={label}
      from={values[`${name}From`]}
      to={values[`${name}To`]}
      onFromChange={(v) => set(`${name}From`, v)}
      onToChange={(v) => set(`${name}To`, v)}
      {...props}
    />
  );
}

export default function SpecsSection({ form }) {
  const { values, set, toggle } = form;
  const onlyLand = values.types.length === 1 && values.types[0] === "land";

  return (
    <FormSection
      id="specs"
      title="4. Property specifications"
      description="Details shared across the project. The fields change with the project type."
    >
      {!onlyLand && (
        <div className="grid gap-5 md:grid-cols-3">
          <FormRange form={form} name="living" label="Living rooms / majlis" />
          <FormRange form={form} name="floors" label="Floors" />
          <FormRange form={form} name="buildingArea" label="Building area (m²)" />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <FormRange form={form} name="landArea" label="Land area (m²)" />
        <FormRange form={form} name="streetWidth" label="Street width (m)" />
        <SearchableSelect
          label="Property age"
          options={PROPERTY_AGES}
          value={values.age}
          onChange={(v) => set("age", v)}
          placeholder="Select age"
          searchPlaceholder="Search..."
        />
      </div>

      <FacadeSelector value={values.facades} onToggle={(v) => toggle("facades", v)} />

      {!onlyLand && (
        <div className="grid items-start gap-x-10 gap-y-6 md:grid-cols-2">
          <ParkingField values={values} set={set} />
          <FurnishingField values={values} set={set} toggle={toggle} />
        </div>
      )}

      <WarrantyFields values={values} set={set} />
    </FormSection>
  );
}
