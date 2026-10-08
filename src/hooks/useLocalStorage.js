"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "local-storage-change";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

/**
 * Boolean persisted in localStorage, SSR-safe (server/first render uses `fallback`).
 * Storage failures (private mode, blocked) are ignored.
 */
export function useLocalStorageBoolean(key, fallback = false) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : raw === "1";
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );

  const setValue = useCallback(
    (next) => {
      try {
        localStorage.setItem(key, next ? "1" : "0");
      } catch {}
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );

  return [value, setValue];
}
