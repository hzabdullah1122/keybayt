"use client";

import { ChipGroup, DatePicker, FieldLabel, Input, Textarea } from "@/components/ui";
import FormSection from "@/components/projects/shared/FormSection";
import FieldHint from "@/components/projects/shared/FieldHint";
import DeveloperLockedField from "@/components/projects/basic/DeveloperLockedField";
import BrokerDeveloperPanel from "@/components/projects/basic/BrokerDeveloperPanel";
import ProjectStatusCards from "@/components/projects/basic/ProjectStatusCards";
import { PROJECT_TYPES } from "@/constants/projects";

export default function BasicInfoSection({ form }) {
  const { values, set, toggleType } = form;

  return (
    <FormSection
      id="basic"
      title="1. Basic project information"
      description="This name and description are shown to customers in the app."
    >
      <div className="flex flex-col gap-5">
        <Input
          label="Project name *"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Enter project name"
        />
        <Textarea
          label="Project description *"
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="What makes the project special and who it suits"
        />
      </div>

      {values.companyType === "broker" ? (
        <BrokerDeveloperPanel form={form} />
      ) : (
        <DeveloperLockedField />
      )}

      <div className="flex flex-col gap-2.5">
        <FieldLabel required hint="(choose all that apply, each one gets its own prices in section 3)">
          Project type
        </FieldLabel>
        <ChipGroup
          label="Project type"
          options={PROJECT_TYPES}
          value={values.types}
          onToggle={toggleType}
        />
      </div>

      <ProjectStatusCards value={values.status} onChange={(v) => set("status", v)} />

      {values.status !== "ready" && (
        <div className="flex max-w-xs flex-col gap-1.5">
          <DatePicker
            mode="month"
            label="Expected completion date *"
            value={values.completion}
            onChange={(v) => set("completion", v)}
          />
          <FieldHint>Month and year are enough.</FieldHint>
        </div>
      )}
    </FormSection>
  );
}
