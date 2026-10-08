"use client";

import { useMemo } from "react";
import { Building2, Handshake, MapPin, Ruler, Tag } from "lucide-react";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import { PROJECT_STATUSES, PROJECT_TYPES } from "@/constants/projects";
import { formatNumber, summarizeUnits } from "@/lib/projectMetrics";

function PreviewRow({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-foreground">
      <Icon size={16} className="mt-0.5 shrink-0 text-primary" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

/** Live "how it looks" summary that updates while the form is filled. */
export default function ProjectPreviewCard({ values }) {
  const { priceRange, areaRange } = useMemo(
    () => summarizeUnits(values.types, values.units),
    [values.types, values.units],
  );

  const typeLabels = PROJECT_TYPES.filter((t) => values.types.includes(t.value)).map((t) => t.label);
  const status = PROJECT_STATUSES.find((s) => s.value === values.status);
  const location = [values.district, values.city, values.region].filter(Boolean).join(", ");
  const isBroker = values.companyType === "broker";
  const CompanyIcon = isBroker ? Handshake : Building2;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <ImageWithLoader
        src={values.cover?.url}
        alt="Project cover"
        className="h-36 w-full"
        preview={Boolean(values.cover)}
      />
      <div className="flex flex-col gap-3.5 p-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
              <CompanyIcon size={12} />
              {isBroker ? "Brokerage" : "Developer"}
            </span>
            {status && <span className="text-xs text-muted">{status.label}</span>}
          </div>
          <h3 className="truncate text-base font-semibold text-foreground">
            {values.name || "Project name"}
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <PreviewRow icon={MapPin}>
            {location || <span className="text-muted">Location not set</span>}
          </PreviewRow>
          <PreviewRow icon={Tag}>
            {priceRange[0] === null ? (
              <span className="text-muted">Price not set</span>
            ) : (
              <>
                SAR {formatNumber(priceRange[0])} – {formatNumber(priceRange[1])}
              </>
            )}
          </PreviewRow>
          <PreviewRow icon={Ruler}>
            {areaRange[0] === null ? (
              <span className="text-muted">Area not set</span>
            ) : (
              <>
                {formatNumber(areaRange[0])} – {formatNumber(areaRange[1])} m²
              </>
            )}
          </PreviewRow>
        </div>

        {typeLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {typeLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
