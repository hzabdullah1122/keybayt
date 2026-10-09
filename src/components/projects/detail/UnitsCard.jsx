import { Layers } from "lucide-react";
import DetailCard from "@/components/projects/detail/DetailCard";
import DetailItem, { DetailGrid } from "@/components/projects/detail/DetailItem";
import { PROJECT_TYPES } from "@/constants/projects";
import { rangeText } from "@/lib/projectFormat";
import { formatNumber } from "@/lib/projectMetrics";

/** One block per project type with its own price, area, units and rooms. */
export default function UnitsCard({ values }) {
  const types = PROJECT_TYPES.filter((t) => values.types.includes(t.value));

  return (
    <DetailCard icon={Layers} title="Unit types and pricing">
      {types.length === 0 ? (
        <p className="text-sm text-muted">No unit types added.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {types.map((type) => {
            const unit = values.units[type.value] ?? {};
            const hasRooms = type.value !== "land";
            const price = rangeText(unit.minPrice, unit.maxPrice);
            return (
              <div key={type.value} className="overflow-hidden rounded-xl border border-border">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-5 py-3">
                  <span className="text-sm font-semibold text-foreground">{type.label}</span>
                  <span className="text-sm font-semibold text-primary">
                    {price ? `SAR ${price}` : "Price not set"}
                  </span>
                </div>
                <div className="p-5">
                  <DetailGrid columns="sm:grid-cols-2 xl:grid-cols-3">
                    <DetailItem label="Area" value={rangeText(unit.minArea, unit.maxArea, "m²")} />
                    <DetailItem
                      label="Units available / total"
                      value={
                        unit.total
                          ? `${formatNumber(Number(unit.available || 0))} / ${formatNumber(Number(unit.total))}`
                          : null
                      }
                    />
                    {hasRooms && (
                      <>
                        <DetailItem label="Bedrooms" value={rangeText(unit.bedFrom, unit.bedTo)} />
                        <DetailItem label="Bathrooms" value={rangeText(unit.bathFrom, unit.bathTo)} />
                      </>
                    )}
                  </DetailGrid>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DetailCard>
  );
}
