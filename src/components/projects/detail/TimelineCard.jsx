import { Clock } from "lucide-react";
import StatusBadge from "@/components/projects/list/StatusBadge";
import { timestampText } from "@/lib/projectFormat";

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{children}</span>
    </div>
  );
}

/** Created / updated dates and the current workflow status. */
export default function TimelineCard({ project }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Clock size={16} />
        </span>
        <h2 className="text-base font-semibold text-foreground">Activity</h2>
      </div>
      <div className="flex flex-col gap-3">
        <Row label="Status">
          <StatusBadge status={project.status} />
        </Row>
        <Row label="Created">{timestampText(project.createdAt)}</Row>
        <Row label="Last updated">{timestampText(project.updatedAt)}</Row>
      </div>
    </div>
  );
}
