"use client";

import { useMemo } from "react";
import { ChipGroup, FieldLabel, SegmentedControl } from "@/components/ui";
import FormSection from "@/components/projects/shared/FormSection";
import UnitTypeCard from "@/components/projects/units/UnitTypeCard";
import OverallSummary from "@/components/projects/units/OverallSummary";
import PaymentDetails from "@/components/projects/units/PaymentDetails";
import { EMPTY_UNIT, PAYMENT_OPTIONS, PROJECT_TYPES, YES_NO } from "@/constants/projects";
import { summarizeUnits } from "@/lib/projectMetrics";

export default function UnitsSection({ form }) {
  const { values, set, toggle, setUnit } = form;
  const selected = PROJECT_TYPES.filter((t) => values.types.includes(t.value));
  const summary = useMemo(() => summarizeUnits(values.types, values.units), [values.types, values.units]);

  return (
    <FormSection
      id="units"
      title="3. Unit types, prices and payment"
      description="One card per project type you picked. A customer searching for apartments is matched only against the apartment prices."
    >
      {selected.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border bg-surface p-7 text-center text-sm text-muted">
          Pick at least one project type in section 1 to add its prices here.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {selected.map((type) => (
            <UnitTypeCard
              key={type.value}
              type={type}
              unit={values.units[type.value] ?? EMPTY_UNIT}
              onChange={(field, value) => setUnit(type.value, field, value)}
            />
          ))}
          <OverallSummary summary={summary} typeCount={selected.length} />
        </div>
      )}

      <div className="flex flex-wrap items-start gap-x-10 gap-y-5">
        <div className="flex shrink-0 flex-col gap-2">
          <FieldLabel required>Payment options</FieldLabel>
          <ChipGroup
            label="Payment options"
            options={PAYMENT_OPTIONS}
            value={values.payments}
            onToggle={(v) => toggle("payments", v)}
          />
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <FieldLabel>Sakani supported</FieldLabel>
          <SegmentedControl
            label="Sakani supported"
            options={YES_NO}
            value={values.sakani}
            onChange={(v) => set("sakani", v)}
          />
        </div>
      </div>

      <PaymentDetails values={values} set={set} />
    </FormSection>
  );
}
