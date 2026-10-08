"use client";

import { FieldLabel } from "@/components/ui";
import SubHeading from "@/components/projects/shared/SubHeading";
import UploadDropzone from "@/components/projects/shared/UploadDropzone";

/** Floor plans and brochure uploads. */
export default function DocumentsBlock({ values, set }) {
  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <SubHeading title="Documents" hint="Files customers can view or download." />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <FieldLabel>Floor plans</FieldLabel>
          <UploadDropzone
            title="Upload floor plans"
            hint="One file per unit type, PDF or image"
            accept=".pdf,image/*"
            fileName={values.floorPlans?.name}
            onSelect={(file) => set("floorPlans", { name: file.name })}
            onRemove={() => set("floorPlans", null)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel>Brochure</FieldLabel>
          <UploadDropzone
            title="Upload brochure"
            hint="PDF only"
            accept=".pdf"
            fileName={values.brochure?.name}
            onSelect={(file) => set("brochure", { name: file.name })}
            onRemove={() => set("brochure", null)}
          />
        </div>
      </div>
    </div>
  );
}
