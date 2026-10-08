import { Building, Layers, Maximize2, Tag } from "lucide-react";
import { formatNumber } from "@/lib/projectMetrics";

function Stat({ icon: Icon, label, value, note }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
      <span className="flex items-center gap-2 text-xs font-medium text-muted">
        <Icon size={14} className="text-primary" />
        {label}
      </span>
      <span className="text-lg font-bold leading-tight text-foreground">{value}</span>
      {note && <span className="text-xs text-muted">{note}</span>}
    </div>
  );
}

/** How the whole project appears to customers browsing: lowest/highest across all unit types. */
export default function OverallSummary({ summary, typeCount }) {
  const { priceRange, areaRange, totalUnits, availableUnits } = summary;
  const [minPrice, maxPrice] = priceRange;
  const [minArea, maxArea] = areaRange;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary-light/60 p-5">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[15px] font-semibold text-foreground">Project overview for customers</h3>
        <p className="text-xs text-muted">
          This is how the whole project appears when customers browse. Matching still uses each unit
          type&apos;s own range, and price changes are kept in the price history.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        <Stat
          icon={Tag}
          label="Starting price"
          value={minPrice === null ? "…" : `SAR ${formatNumber(minPrice)}`}
          note={maxPrice === null ? undefined : `Up to SAR ${formatNumber(maxPrice)}`}
        />
        <Stat
          icon={Maximize2}
          label="Area range"
          value={minArea === null ? "…" : `${formatNumber(minArea)} – ${formatNumber(maxArea)} m²`}
        />
        <Stat
          icon={Building}
          label="Units available"
          value={totalUnits ? `${formatNumber(availableUnits)} of ${formatNumber(totalUnits)}` : "…"}
          note={totalUnits ? "Across all unit types" : undefined}
        />
        <Stat
          icon={Layers}
          label="Unit types"
          value={String(typeCount)}
        />
      </div>
    </div>
  );
}
