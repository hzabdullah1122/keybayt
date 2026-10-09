"use client";

import { useEffect, useRef, useState } from "react";
import { MapPinOff } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

// Free vector style (OpenStreetMap data), no API key needed.
const STYLE_URL = "https://tiles.openfreemap.org/styles/bright";
const DEFAULT_CENTER = [46.6753, 24.7136]; // [lng, lat] Riyadh
const DEFAULT_ZOOM = 4.5;
const PIN_ZOOM = 16;
const LOCATE_ZOOM = 14;
const LOAD_TIMEOUT_MS = 12000;

// English-first label expression (falls back to the local name when no English one exists).
const ENGLISH_LABEL = ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]];

// CSS pin (no image assets): rotated rounded square with a dot. The tip sits at the anchor.
const PIN_HTML =
  '<span class="relative block h-11 w-10">' +
  '<span class="absolute left-1/2 top-0.5 block h-8 w-8 -translate-x-1/2 -rotate-45 rounded-full rounded-br-none border-2 border-background bg-primary"></span>' +
  '<span class="absolute left-1/2 top-[11px] block h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-background"></span>' +
  "</span>";

/** Force every place-name label layer to show English names. */
function applyEnglishLabels(map) {
  map.getStyle().layers.forEach((layer) => {
    const field = layer.layout?.["text-field"];
    if (field && JSON.stringify(field).includes("name")) {
      map.setLayoutProperty(layer.id, "text-field", ENGLISH_LABEL);
    }
  });
}

/**
 * Vector map (MapLibre + OpenFreeMap) with one draggable pin, labels in English.
 * lat/lng: current pin (numbers) or null.  onChange({ lat, lng }) on map click / pin drag.
 * `readOnly` shows a fixed pin only (no click/drag, no location prompt).
 * On first load the map centres on the browser location (if allowed and no pin yet).
 * MapLibre touches `window`, so it is loaded inside an effect (client only).
 */
export default function MapView({ lat, lng, onChange, onLocate, readOnly = false, className }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const onLocateRef = useRef(onLocate);
  const hasPinRef = useRef(lat !== null && lng !== null);
  const latRef = useRef(lat);
  const lngRef = useRef(lng);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
    onLocateRef.current = onLocate;
    hasPinRef.current = lat !== null && lng !== null;
    latRef.current = lat;
    lngRef.current = lng;
  }, [onChange, onLocate, lat, lng]);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    let map;

    const timeout = setTimeout(() => !cancelled && setFailed(true), LOAD_TIMEOUT_MS);

    import("maplibre-gl")
      .then((mod) => {
      const maplibre = mod.default ?? mod;
      if (cancelled || !containerRef.current) return;
      const hasInitialPin = hasPinRef.current;
      map = new maplibre.Map({
        container: containerRef.current,
        style: STYLE_URL,
        center: readOnly && hasInitialPin ? [lngRef.current, latRef.current] : DEFAULT_CENTER,
        zoom: readOnly && hasInitialPin ? PIN_ZOOM : DEFAULT_ZOOM,
      });
      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
      let locate = null;
      if (!readOnly) {
        locate = new maplibre.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          fitBoundsOptions: { maxZoom: LOCATE_ZOOM },
          showAccuracyCircle: false,
        });
        map.addControl(locate, "top-right");
        locate.on("geolocate", (e) =>
          onLocateRef.current?.({ lat: e.coords.latitude, lng: e.coords.longitude }),
        );
      }
      map.on("style.load", () => applyEnglishLabels(map));
      if (!readOnly) {
        map.on("click", (e) => onChangeRef.current?.({ lat: e.lngLat.lat, lng: e.lngLat.lng }));
      }
      map.once("load", () => {
        if (cancelled) return;
        clearTimeout(timeout);
        setReady(true);
        // Start on the user's current location (asks for browser permission) unless a pin exists.
        if (locate && !hasPinRef.current) locate.trigger();
      });
      mapRef.current = { maplibre, map };
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      markerRef.current?.remove();
      map?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [readOnly]);

  // Keep the pin in sync with lat/lng.
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const { maplibre, map } = mapRef.current;

    if (lat === null || lng === null) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    if (!markerRef.current) {
      const element = document.createElement("div");
      element.innerHTML = PIN_HTML;
      const marker = new maplibre.Marker({ element, anchor: "bottom", draggable: !readOnly })
        .setLngLat([lng, lat])
        .addTo(map);
      marker.on("dragend", () => {
        const p = marker.getLngLat();
        onChangeRef.current?.({ lat: p.lat, lng: p.lng });
      });
      markerRef.current = marker;
    } else {
      markerRef.current.setLngLat([lng, lat]);
    }

    map.flyTo({
      center: [lng, lat],
      zoom: Math.max(map.getZoom(), PIN_ZOOM),
      duration: readOnly ? 0 : 800,
    });
  }, [ready, lat, lng, readOnly]);

  return (
    <div className={cn("relative isolate overflow-hidden bg-surface", className)}>
      <div ref={containerRef} className="h-full w-full" />
      {!ready && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-surface px-4 text-center">
          {failed ? (
            <>
              <MapPinOff size={22} className="text-placeholder" />
              <p className="text-sm font-semibold text-foreground">Map could not load</p>
              <p className="max-w-xs text-xs text-muted">
                Check your internet connection and that WebGL is enabled, then reopen this step.
              </p>
            </>
          ) : (
            <Spinner size={20} />
          )}
        </div>
      )}
    </div>
  );
}
