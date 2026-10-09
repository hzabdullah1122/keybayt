import { Sparkles } from "lucide-react";
import DetailCard from "@/components/projects/detail/DetailCard";
import { FEATURES, NEARBY_PLACES } from "@/constants/projects";

/** Selected amenities (with icons) and driving time to nearby places. */
export default function AmenitiesCard({ values }) {
  const features = FEATURES.filter((f) => values.features.includes(f.value));
  const nearby = NEARBY_PLACES.filter((p) => values.nearby?.[p.value]);

  return (
    <DetailCard icon={Sparkles} title="Amenities and nearby places">
      {features.length === 0 && !values.otherAmenities ? (
        <p className="text-sm text-muted">No amenities selected.</p>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
            {features.map(({ value, label, icon: Icon }) => (
              <div
                key={value}
                className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-light/60 px-3.5 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                  <Icon size={16} />
                </span>
                <span className="truncate text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
          {values.otherAmenities && (
            <p className="text-sm text-muted">
              <span className="font-medium text-foreground">Also: </span>
              {values.otherAmenities}
            </p>
          )}
        </div>
      )}

      {nearby.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <span className="text-xs font-medium uppercase tracking-wide text-placeholder">
            Driving time from the project
          </span>
          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            {nearby.map(({ value, label, icon: Icon }) => (
              <div
                key={value}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-3.5 py-3"
              >
                <span className="flex items-center gap-2.5 text-sm text-foreground">
                  <Icon size={16} className="text-primary" />
                  {label}
                </span>
                <span className="text-sm font-semibold text-foreground">{values.nearby[value]} min</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </DetailCard>
  );
}
