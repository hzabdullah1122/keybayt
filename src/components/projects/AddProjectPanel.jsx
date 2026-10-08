"use client";

import { useMemo, useRef, useState } from "react";
import ProjectFormHeader from "@/components/projects/ProjectFormHeader";
import ProjectStepper from "@/components/projects/ProjectStepper";
import ProjectStepContent from "@/components/projects/ProjectStepContent";
import StepNavigation from "@/components/projects/StepNavigation";
import ProjectSidePanel from "@/components/projects/sidebar/ProjectSidePanel";
import { PROJECT_STEPS } from "@/constants/projects";
import { getStepStatus } from "@/lib/projectMetrics";
import { hasErrors, validateStep } from "@/lib/projectValidation";

/** The "Add project" tab: header, company type, stepper, active step and live side panel. */
export default function AddProjectPanel({
  form,
  stepId,
  onStepChange,
  editing,
  saving,
  onSaveDraft,
  onSubmit,
}) {
  const topRef = useRef(null);
  const stepIndex = PROJECT_STEPS.findIndex((s) => s.id === stepId);
  const stepStatus = useMemo(() => getStepStatus(form.values), [form.values]);

  // Steps where the user already pressed Next with missing data; their errors show live.
  const [attempted, setAttempted] = useState([]);
  const errors = useMemo(
    () => (attempted.includes(stepId) ? validateStep(stepId, form.values) : {}),
    [attempted, stepId, form.values],
  );

  const handleNext = () => {
    if (hasErrors(validateStep(stepId, form.values))) {
      setAttempted((list) => (list.includes(stepId) ? list : [...list, stepId]));
      return;
    }
    goTo(PROJECT_STEPS[stepIndex + 1].id);
  };

  const goTo = (id) => {
    onStepChange(id);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="flex scroll-mt-4 flex-col gap-5">
      <ProjectFormHeader
        editing={editing}
        companyType={form.values.companyType}
        onCompanyTypeChange={(type) => form.set("companyType", type)}
      />

      <ProjectStepper activeId={stepId} status={stepStatus} onSelect={goTo} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex min-w-0 flex-col gap-5">
          <ProjectStepContent stepId={stepId} form={form} errors={errors} />
          <StepNavigation
            isFirst={stepIndex === 0}
            isLast={stepIndex === PROJECT_STEPS.length - 1}
            onBack={() => goTo(PROJECT_STEPS[stepIndex - 1].id)}
            onNext={handleNext}
            onSubmit={onSubmit}
            onSaveDraft={onSaveDraft}
            saving={saving}
          />
        </div>
        <ProjectSidePanel values={form.values} readiness={form.readiness} />
      </div>
    </div>
  );
}
