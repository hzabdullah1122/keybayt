"use client";

import { useMemo, useSyncExternalStore } from "react";
import { SESSION_EVENT, readSessionRaw } from "@/services/authService";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(SESSION_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SESSION_EVENT, callback);
  };
}

/**
 * Current login session. status: "loading" (server / first render) | "authed" | "guest".
 * `session` is { userId, name, email, company } when authed.
 */
export function useSession() {
  const raw = useSyncExternalStore(subscribe, readSessionRaw, () => undefined);

  return useMemo(() => {
    if (raw === undefined) return { status: "loading", session: null };
    if (!raw) return { status: "guest", session: null };
    try {
      return { status: "authed", session: JSON.parse(raw) };
    } catch {
      return { status: "guest", session: null };
    }
  }, [raw]);
}
