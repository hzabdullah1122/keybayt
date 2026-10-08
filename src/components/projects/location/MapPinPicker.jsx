"use client";

import { LocateFixed, MapPinOff, Search } from "lucide-react";
import { Button, FieldLabel, Spinner } from "@/components/ui";
import MapView from "@/components/ui/MapView";
import FieldHint from "@/components/projects/shared/FieldHint";

const STATUS_TEXT = {
  idle: "Type the full address above and the pin will appear here. You can also click the map.",
  searching: "Searching for this address...",
  found: "Address found. Drag the pin or click the map to fine-tune it.",
  notfound: "We could not find this address. Click the map to place the pin yourself.",
  error: "Address search is unavailable right now. Click the map to place the pin.",
};

/** Map with a draggable pin that follows the typed address. */
export default function MapPinPicker({ lat, lng, onChange, onClear, onFind, status }) {
  const hasPin = lat !== null && lng !== null;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FieldLabel required>Map location</FieldLabel>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={Search} onClick={onFind}>
            Find address on map
          </Button>
          {hasPin && (
            <Button variant="ghost" size="sm" leftIcon={MapPinOff} onClick={onClear}>
              Clear pin
            </Button>
          )}
        </div>
      </div>

      <MapView
        lat={lat}
        lng={lng}
        onChange={onChange}
        className="h-[300px] rounded-xl border border-border sm:h-[360px] 2xl:h-[420px]"
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs text-muted">
          {status === "searching" && <Spinner size={14} />}
          <FieldHint>{STATUS_TEXT[status]}</FieldHint>
        </span>
        <span className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground">
          <LocateFixed size={14} className="text-primary" />
          {hasPin ? `${lat.toFixed(5)}, ${lng.toFixed(5)}` : "No pin placed yet"}
        </span>
      </div>
    </div>
  );
}
