"use client";

import { MapPin, MapPinOff } from "lucide-react";
import MapView from "@/components/ui/MapView";
import DetailCard from "@/components/projects/detail/DetailCard";
import DetailItem, { DetailGrid } from "@/components/projects/detail/DetailItem";
import { hasPin } from "@/lib/projectMetrics";

/** Region / city / district / address and a read-only map with the project pin. */
export default function LocationCard({ values }) {
  const pinned = hasPin(values);

  return (
    <DetailCard icon={MapPin} title="Location">
      <DetailGrid columns="sm:grid-cols-3">
        <DetailItem label="Region" value={values.region} />
        <DetailItem label="City" value={values.city} />
        <DetailItem label="District" value={values.district} />
      </DetailGrid>

      <DetailGrid columns="grid-cols-1">
        <DetailItem label="Full address" value={values.address} />
      </DetailGrid>

      {pinned ? (
        <div className="flex flex-col gap-2">
          <MapView
            lat={values.lat}
            lng={values.lng}
            readOnly
            className="h-[260px] rounded-xl border border-border sm:h-[320px]"
          />
          <span className="text-xs text-muted">
            Pin at {values.lat.toFixed(5)}, {values.lng.toFixed(5)}
          </span>
        </div>
      ) : (
        <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface text-sm text-muted">
          <MapPinOff size={20} />
          No map pin placed
        </div>
      )}
    </DetailCard>
  );
}
