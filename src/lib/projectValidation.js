/**
 * Per-step validation used when the user clicks "Next".
 * Returns an object { fieldKey: "message" }; empty means the step is valid.
 * Steps without rules return {}.
 */
const REQUIRED = "This field is required.";

export function validateStep(stepId, values) {
  const errors = {};

  if (stepId === "licenses") {
    if (values.status !== "ready") {
      if (!values.wafiNumber.trim()) errors.wafiNumber = "License number is required.";
      if (!values.wafiExpiry) errors.wafiExpiry = "Expiry date is required.";
    }
    if (!values.adNumber.trim()) errors.adNumber = "Advertising license number is required.";
    if (!values.adExpiry) errors.adExpiry = "Expiry date is required.";
  }

  return errors;
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;

export { REQUIRED };
