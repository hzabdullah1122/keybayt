"use client";

import { BadgeCheck, ShieldCheck } from "lucide-react";
import FormSection from "@/components/projects/shared/FormSection";
import LicenseCard from "@/components/projects/shared/LicenseCard";

/** `errors` comes from the Next-button validation (empty until the user tries to continue). */
export default function LicensesSection({ form, errors = {} }) {
  const { values, set } = form;

  return (
    <FormSection
      id="licenses"
      title="6. Project licenses"
      description="Licenses belong to this project, not to your company profile. They are checked by the KeyBayt team and not shown to customers."
    >
      <div className="grid gap-5 2xl:grid-cols-2">
        {values.status !== "ready" && (
          <LicenseCard
            icon={BadgeCheck}
            title="Off-plan sales license (Wafi)"
            description="For projects that are not ready yet"
            number={values.wafiNumber}
            expiry={values.wafiExpiry}
            fileName={values.wafiFile?.name}
            errors={{ number: errors.wafiNumber, expiry: errors.wafiExpiry }}
            onNumberChange={(v) => set("wafiNumber", v)}
            onExpiryChange={(v) => set("wafiExpiry", v)}
            onFileSelect={(file) => set("wafiFile", { name: file.name })}
            onFileRemove={() => set("wafiFile", null)}
          />
        )}
        <LicenseCard
          icon={ShieldCheck}
          title="Real estate advertising license (REGA)"
          description="Needed for every project"
          numberLabel="Advertising license number"
          numberPlaceholder="Enter advertising license number"
          number={values.adNumber}
          expiry={values.adExpiry}
          fileName={values.adFile?.name}
          errors={{ number: errors.adNumber, expiry: errors.adExpiry }}
          onNumberChange={(v) => set("adNumber", v)}
          onExpiryChange={(v) => set("adExpiry", v)}
          onFileSelect={(file) => set("adFile", { name: file.name })}
          onFileRemove={() => set("adFile", null)}
        />
      </div>
    </FormSection>
  );
}
