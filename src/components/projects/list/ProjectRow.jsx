"use client";

import { useMemo } from "react";
import { Building2, Calendar, Handshake } from "lucide-react";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import StatusBadge from "@/components/projects/list/StatusBadge";
import { PROJECT_TYPES } from "@/constants/projects";
import { formatNumber, getReadiness, summarizeUnits } from "@/lib/projectMetrics";

export const ROW_GRID =
  "xl:grid xl:grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.1fr)_160px] xl:items-center xl:gap-x-5";

const formatDate = (ms) =>
  new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** One labelled value. The label only shows on small screens (the table header covers xl). */
function Cell({ label, children }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[11px] font-medium uppercase tracking-wide text-placeholder xl:hidden">
        {label}
      </span>
      <div className="min-w-0 text-sm text-foreground">{children}</div>
    </div>
  );
}

const Muted = ({ children }) => <span className="text-muted">{children}</span>;

/** One project as a table row (xl) / stacked card (smaller screens). `actions` = buttons. */
export default function ProjectRow({ project, actions, onOpen }) {
  const { values, status, updatedAt, sample } = project;
  const isBroker = values.companyType === "broker";
  const CompanyIcon = isBroker ? Handshake : Building2;

  const percent = useMemo(() => getReadiness(values).percent, [values]);
  const summary = useMemo(
    () => summarizeUnits(values.types, values.units),
    [values.types, values.units],
  );
  const [minPrice, maxPrice] = summary.priceRange;

  const typeLabels = PROJECT_TYPES.filter((t) => values.types.includes(t.value))
    .map((t) => t.label)
    .join(" · ");
  const place = [values.district, values.city].filter(Boolean).join(", ");

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onOpen?.();
        }
      }}
      aria-label={`Open ${values.name || "project"}`}
      className={`cursor-pointer outline-none focus-visible:border-primary grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/40 sm:grid-cols-3 ${ROW_GRID}`}
    >
      {/* Project */}
      <div className="col-span-2 flex min-w-0 items-center gap-3.5 sm:col-span-3 xl:col-span-1">
        <ImageWithLoader
          src={values.cover?.url}
          alt={values.name || "Project cover"}
          className="h-14 w-14 shrink-0 rounded-xl"
          preview={false}
          fallbackIcon={HiOutlineBuildingLibrary}
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {values.name || "Untitled project"}
            </h3>
            {sample && (
              <span className="shrink-0 rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted">
                Sample
              </span>
            )}
          </div>
          <span className="flex items-center gap-1.5 truncate text-xs text-muted">
            <CompanyIcon size={12} className="shrink-0" />
            {isBroker ? "Brokerage" : "Developer"}
            {typeLabels && <> · {typeLabels}</>}
          </span>
        </div>
      </div>

      <Cell label="Location">{place || <Muted>Not set</Muted>}</Cell>

      <Cell label="Price range">
        {minPrice === null ? (
          <Muted>Not set</Muted>
        ) : (
          <span className="font-medium">
            SAR {formatNumber(minPrice)} – {formatNumber(maxPrice)}
          </span>
        )}
      </Cell>

      <Cell label="Units">
        {summary.totalUnits ? (
          <>
            <span className="font-medium">{formatNumber(summary.availableUnits)}</span>
            <Muted> / {formatNumber(summary.totalUnits)}</Muted>
          </>
        ) : (
          <Muted>—</Muted>
        )}
      </Cell>

      <Cell label="Match readiness">
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-full max-w-[90px] overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-xs font-semibold">{percent}%</span>
        </div>
      </Cell>

      <Cell label="Status">
        <div className="flex flex-col gap-1.5">
          <StatusBadge status={status} />
          <span className="flex items-center gap-1 text-[11px] text-muted">
            <Calendar size={11} />
            {formatDate(updatedAt)}
          </span>
        </div>
      </Cell>

      <div
        onClick={(e) => e.stopPropagation()}
        className="col-span-2 flex items-center justify-end gap-2 sm:col-span-3 xl:col-span-1"
      >
        {actions}
      </div>
    </article>
  );
}
