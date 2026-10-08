"use client";

import FormSection from "@/components/projects/shared/FormSection";
import ImagesBlock from "@/components/projects/media/ImagesBlock";
import LinksBlock from "@/components/projects/media/LinksBlock";
import DocumentsBlock from "@/components/projects/media/DocumentsBlock";

export default function MediaSection({ form }) {
  const { values, set } = form;

  return (
    <FormSection
      id="media"
      title="7. Media and documents"
      description="Good photos, floor plans and a virtual tour help customers decide faster."
    >
      <ImagesBlock values={values} set={set} />
      <LinksBlock values={values} set={set} />
      <DocumentsBlock values={values} set={set} />
    </FormSection>
  );
}
