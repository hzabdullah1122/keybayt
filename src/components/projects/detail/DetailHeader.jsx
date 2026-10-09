"use client";

import { ArrowLeft, Building2, Calendar, Handshake } from "lucide-react";
import { Button } from "@/components/ui";
import StatusBadge from "@/components/projects/list/StatusBadge";
import { timestampText } from "@/lib/projectFormat";

/** Back link, project title, status and the status-dependent action buttons. */
export default function DetailHeader({ project, onBack, actions }) {
  const { values, status, updatedAt, sample } = project;
  const isBroker = values.companyType === "broker";
  const CompanyIcon = isBroker ? Handshake : Building2;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button variant="ghost" size="sm" leftIcon={ArrowLeft} onClick={onBack}>
          All projects
        </Button>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {values.name || "Untitled project"}
            </h1>
            <StatusBadge status={status} />
            {sample && (
              <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted">
                Sample
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <CompanyIcon size={14} />
              {isBroker ? "Brokerage company" : "Developer"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Updated {timestampText(updatedAt)}
            </span>
          </div>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}
