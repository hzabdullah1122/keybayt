"use client";

import { Input, UnitSelectInput } from "@/components/ui";
import { WARRANTY_UNITS } from "@/constants/projects";

export default function WarrantyFields({ values, set }) {
  return (
    <div className="flex flex-col gap-3.5 border-t border-border pt-5">
      <span className="text-[15px] font-semibold text-foreground">Warranty</span>
      <div className="grid gap-5 md:grid-cols-3">
        <UnitSelectInput
          id="warranty-structure"
          label="Structural warranty"
          placeholder="e.g. 10"
          value={values.warrantyStructure}
          onChange={(v) => set("warrantyStructure", v)}
          unit={values.warrantyStructureUnit}
          onUnitChange={(v) => set("warrantyStructureUnit", v)}
          units={WARRANTY_UNITS}
        />
        <Input
          wrapperClassName="md:col-span-2"
          label="Other warranties"
          value={values.warrantyOther}
          onChange={(e) => set("warrantyOther", e.target.value)}
          placeholder="e.g. Electrical and plumbing 2 years, AC 1 year"
        />
      </div>
    </div>
  );
}
