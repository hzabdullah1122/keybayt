import { Lock } from "lucide-react";
import { FieldLabel } from "@/components/ui";
import FieldHint from "@/components/projects/shared/FieldHint";
import { CURRENT_COMPANY_NAME } from "@/constants/projects";

/** Developer view: the developer is the signed-in company, shown read-only. */
export default function DeveloperLockedField() {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel>Developer</FieldLabel>
      <div className="flex h-10 items-center gap-2.5 rounded-lg border border-border bg-surface px-3 text-sm text-foreground">
        <Lock size={15} className="text-muted" />
        {CURRENT_COMPANY_NAME}
      </div>
      <FieldHint>Linked to your company profile automatically.</FieldHint>
    </div>
  );
}
