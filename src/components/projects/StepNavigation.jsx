import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import { Button } from "@/components/ui";

/** Back / Next buttons under the step card. The last step shows "Submit for review". */
export default function StepNavigation({ isFirst, isLast, onBack, onNext, onSubmit, onSaveDraft, saving = false }) {
  return (
    <div className="flex items-center justify-between gap-3">
      {isFirst ? (
        <span />
      ) : (
        <Button variant="outline" leftIcon={ArrowLeft} onClick={onBack}>
          Back
        </Button>
      )}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button variant="outline" leftIcon={Save} loading={saving} onClick={onSaveDraft}>
          Save as draft
        </Button>
        {isLast ? (
          <Button leftIcon={Send} onClick={onSubmit} loading={saving}>
            Submit for review
          </Button>
        ) : (
          <Button onClick={onNext}>
            Next step
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
