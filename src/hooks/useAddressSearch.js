"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { geocodingService } from "@/services/geocodingService";

const DEBOUNCE_MS = 900;
const MIN_QUERY_LENGTH = 4;

/**
 * Debounced address lookup. Call `search(query)` on every address change; when a match is
 * found `onFound({ lat, lng })` fires. status: idle | searching | found | notfound | error
 */
export function useAddressSearch(onFound) {
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);
  const abortRef = useRef(null);
  const onFoundRef = useRef(onFound);

  useEffect(() => {
    onFoundRef.current = onFound;
  }, [onFound]);

  const cancel = useCallback(() => {
    clearTimeout(timerRef.current);
    abortRef.current?.abort();
  }, []);

  useEffect(() => cancel, [cancel]);

  const run = useCallback(async (query, countryCode) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("searching");
    try {
      const result = await geocodingService.search(query, {
        signal: controller.signal,
        countryCode,
      });
      if (!result) {
        setStatus("notfound");
        return;
      }
      onFoundRef.current?.({ lat: result.lat, lng: result.lng });
      setStatus("found");
    } catch (err) {
      if (err.name !== "AbortError") setStatus("error");
    }
  }, []);

  const search = useCallback(
    (query, { immediate = false, countryCode } = {}) => {
      cancel();
      if (query.trim().length < MIN_QUERY_LENGTH) {
        setStatus("idle");
        return;
      }
      if (immediate) run(query, countryCode);
      else timerRef.current = setTimeout(() => run(query, countryCode), DEBOUNCE_MS);
    },
    [cancel, run],
  );

  const reset = useCallback(() => {
    cancel();
    setStatus("idle");
  }, [cancel]);

  return { status, search, reset };
}
