"use client";

import { useEffect, useRef, useState } from "react";
import { geocodingService } from "@/services/geocodingService";

// Remember the last result so revisiting the step does not call the API again.
let cachedInfo = null;

const GEO_OPTIONS = { enableHighAccuracy: false, timeout: 12000, maximumAge: 5 * 60 * 1000 };

/**
 * Reads the browser location once and turns it into { region, city, district, countryCode, lat, lng } (English).
 * status: locating | detected | denied | unavailable | failed
 * `onDetected(info)` fires when a region could be matched.
 */
export function useDetectedLocation(onDetected) {
  const [state, setState] = useState(() =>
    cachedInfo ? { status: "detected", detected: cachedInfo } : { status: "locating", detected: null },
  );
  const onDetectedRef = useRef(onDetected);

  useEffect(() => {
    onDetectedRef.current = onDetected;
  }, [onDetected]);

  useEffect(() => {
    if (cachedInfo) {
      if (cachedInfo.region) onDetectedRef.current?.(cachedInfo);
      return;
    }
    if (!("geolocation" in navigator)) {
      queueMicrotask(() => setState({ status: "unavailable", detected: null }));
      return;
    }

    let active = true;
    const controller = new AbortController();

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const parts = await geocodingService.reverse(coords.latitude, coords.longitude, {
            signal: controller.signal,
          });
          if (!active) return;
          if (!parts) {
            setState({ status: "failed", detected: null });
            return;
          }
          const info = {
            region: parts.state || parts.city,
            city: parts.city,
            district: parts.district,
            address: parts.address,
            countryCode: parts.countryCode,
            lat: coords.latitude,
            lng: coords.longitude,
          };
          cachedInfo = info;
          setState({ status: "detected", detected: info });
          if (info.region) onDetectedRef.current?.(info);
        } catch {
          if (active) setState({ status: "failed", detected: null });
        }
      },
      (err) => active && setState({ status: err.code === 1 ? "denied" : "failed", detected: null }),
      GEO_OPTIONS,
    );

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return state;
}
