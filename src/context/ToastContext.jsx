"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ToastViewport from "@/components/common/ToastViewport";

const ToastContext = createContext(null);

const MAX_TOASTS = 4;
const DEFAULT_DURATION = { success: 4000, error: 6000 };
const DEFAULT_TITLE = { success: "Success", error: "Something went wrong" };

let nextId = 1;

/**
 * App-wide toasts. Wrap the app once, then anywhere:
 *   const toast = useToast();
 *   toast.success("Draft saved");                       // title defaults to "Success"
 *   toast.error("Wrong password", { title: "Login failed" });
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((type, message, options = {}) => {
    const toast = {
      id: nextId++,
      type,
      message,
      title: options.title ?? DEFAULT_TITLE[type],
      duration: options.duration ?? DEFAULT_DURATION[type],
    };
    setToasts((list) => [...list, toast].slice(-MAX_TOASTS));
    return toast.id;
  }, []);

  const api = useMemo(
    () => ({
      success: (message, options) => push("success", message, options),
      error: (message, options) => push("error", message, options),
      dismiss,
    }),
    [push, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
