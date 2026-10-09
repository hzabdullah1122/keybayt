import { FileText } from "lucide-react";
import DetailCard from "@/components/projects/detail/DetailCard";
import DetailItem, { DetailGrid } from "@/components/projects/detail/DetailItem";
import Pill from "@/components/projects/detail/Pill";
import {
  DEVELOPER_OPTIONS,
  PROJECT_STATUSES,
  PROJECT_TYPES,
} from "@/constants/projects";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
import { dateText, optionLabel, optionLabels } from "@/lib/projectFormat";

/** Description, type, status and who the developer is. */
export default function OverviewCard({ values }) {
  const company = useCurrentCompany();
  const isBroker = values.companyType === "broker";
  const developer = isBroker
    ? values.devName || optionLabel(DEVELOPER_OPTIONS, values.developerId)
    : company;
  const statusLabel = optionLabel(PROJECT_STATUSES, values.status);
  const types = optionLabels(PROJECT_TYPES, values.types);

  return (
    <DetailCard icon={FileText} title="Overview">
      {values.description ? (
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
          {values.description}
        </p>
      ) : (
        <p className="text-sm text-muted">No description added yet.</p>
      )}

      {types.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {types.map((label) => (
            <Pill key={label}>{label}</Pill>
          ))}
        </div>
      )}

      <DetailGrid>
        <DetailItem label="Project status" value={statusLabel} />
        <DetailItem
          label="Expected completion"
          value={values.status === "ready" ? "Already ready" : dateText(values.completion, "month")}
        />
        <DetailItem label="Developer" value={developer} />
        <DetailItem label="Listed as" value={isBroker ? "Brokerage company" : "Developer"} />
        {isBroker && values.devCr && <DetailItem label="Developer CR number" value={values.devCr} />}
      </DetailGrid>
    </DetailCard>
  );
}
