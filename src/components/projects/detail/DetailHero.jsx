"use client";

import { Building, CalendarClock, MapPin, Maximize2, Tag } from "lucide-react";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import ReadinessRing from "@/components/projects/detail/ReadinessRing";
import StatTile from "@/components/projects/detail/StatTile";
import { PROJECT_STATUSES, PROJECT_TYPES } from "@/constants/projects";
import { dateText, optionLabel, optionLabels } from "@/lib/projectFormat";
import { formatNumber } from "@/lib/projectMetrics";

/** Big cover + photo strip on the left, key figures and readiness ring on the right. */
export default function DetailHero({ values, summary, percent }) {
  const [minPrice, maxPrice] = summary.priceRange;
  const [minArea, maxArea] = summary.areaRange;
  const place = [values.district, values.city, values.region].filter(Boolean).join(", ");
  const typeLabels = optionLabels(PROJECT_TYPES, values.types);
  const statusLabel = optionLabel(PROJECT_STATUSES, values.status);
  const typeCount = values.types.length;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-2xl border border-border sm:min-h-[340px]">
          {values.cover ? (
            <ImageWithLoader
              src={values.cover.url}
              alt={values.name || "Project cover"}
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-light via-surface to-primary-light text-primary/40">
              <HiOutlineBuildingLibrary size={84} />
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
            {place && (
              <span className="flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground">
                <MapPin size={13} className="text-primary" />
                {place}
              </span>
            )}
            {typeLabels.length > 0 && (
              <span className="rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground">
                {typeLabels.join(" · ")}
              </span>
            )}
          </div>
        </div>

        {values.photos.length > 0 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {values.photos.map((photo) => (
              <ImageWithLoader
                key={photo.id}
                src={photo.url}
                alt={photo.name}
                className="h-16 w-24 shrink-0 rounded-lg border border-border"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <StatTile
            icon={Tag}
            label="Starting price"
            value={minPrice === null ? "—" : `SAR ${formatNumber(minPrice)}`}
            note={maxPrice === null ? undefined : `Up to SAR ${formatNumber(maxPrice)}`}
          />
          <StatTile
            icon={Maximize2}
            label="Area range"
            value={minArea === null ? "—" : `${formatNumber(minArea)} – ${formatNumber(maxArea)} m²`}
          />
          <StatTile
            icon={Building}
            label="Units available"
            value={
              summary.totalUnits
                ? `${formatNumber(summary.availableUnits)} / ${formatNumber(summary.totalUnits)}`
                : "—"
            }
            note={typeCount ? `${typeCount} unit type${typeCount > 1 ? "s" : ""}` : undefined}
          />
          <StatTile
            icon={CalendarClock}
            label={values.status === "ready" ? "Status" : "Completion"}
            value={values.status === "ready" ? "Ready" : (dateText(values.completion, "month") ?? "—")}
            note={statusLabel ?? undefined}
          />
        </div>

        <div className="flex items-center gap-5 rounded-2xl border border-border bg-background p-5">
          <ReadinessRing percent={percent} />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-foreground">Match readiness</span>
            <p className="text-xs leading-relaxed text-muted">
              How much of the customer match score this project covers. Fill every factor to reach a
              full match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
