"use client";

import { MessageSquareText } from "lucide-react";
import { DatePicker, FieldLabel, FileButton, Input, NumberInput, SearchableSelect, SegmentedControl } from "@/components/ui";
import FieldHint from "@/components/projects/shared/FieldHint";
import { DEVELOPER_OPTIONS, DEVELOPER_SOURCES } from "@/constants/projects";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";

/** Brokerage view: pick/enter the developer + upload the developer's authorization. */
export default function BrokerDeveloperPanel({ form }) {
  const { values, set } = form;
  const company = useCurrentCompany();

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-primary/30 bg-primary-light/50 p-5">
      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-semibold text-foreground">Developer of this project</span>
        <FieldHint>
          You are adding this project on behalf of a developer. Several brokerage companies can
          market the same project.
        </FieldHint>
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel required>Is the developer on KeyBayt?</FieldLabel>
        <SegmentedControl
          label="Is the developer on KeyBayt"
          options={DEVELOPER_SOURCES}
          value={values.devSource}
          onChange={(v) => set("devSource", v)}
        />
      </div>

      {values.devSource === "registered" ? (
        <div className="flex max-w-md flex-col gap-1.5">
          <SearchableSelect
            label="Developer *"
            options={DEVELOPER_OPTIONS}
            value={values.developerId}
            onChange={(v) => set("developerId", v)}
            placeholder="Select developer"
            searchPlaceholder="Search developers..."
          />
          <FieldHint>Only verified developers on KeyBayt appear here.</FieldHint>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Developer company name *"
            value={values.devName}
            onChange={(e) => set("devName", e.target.value)}
            placeholder="As written on their CR"
          />
          <NumberInput
            label="Developer CR number"
            value={values.devCr}
            onChange={(v) => set("devCr", v)}
            maxLength={10}
            placeholder="10-digit CR number"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <FieldLabel required>Authorization from the developer</FieldLabel>
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_200px] 2xl:grid-cols-[1fr_200px_auto] 2xl:items-end">
            <Input
              label="Document name *"
              value={values.authName}
              onChange={(e) => set("authName", e.target.value)}
              placeholder="e.g. Marketing authorization letter"
            />
            <DatePicker
              label="Expiry date *"
              value={values.authExpiry}
              onChange={(v) => set("authExpiry", v)}
            />
            <FileButton
              label="Upload authorization"
              accept=".pdf,image/*"
              fileName={values.authFile?.name}
              onSelect={(file) => set("authFile", { name: file.name })}
              onRemove={() => set("authFile", null)}
            />
          </div>
          <FieldHint>
            Reviewed by the KeyBayt team before the project goes live. Not shown to customers.
          </FieldHint>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground">
        <MessageSquareText size={18} className="mt-0.5 shrink-0 text-primary" />
        <span>
          Marketed by <strong>{company}</strong>. Customer requests for this listing
          reach KeyBayt first and are then forwarded to your company.
        </span>
      </div>
    </div>
  );
}
