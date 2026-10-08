"use client";

import { AnimatePresence } from "framer-motion";
import Toast from "@/components/common/Toast";

/** Fixed stack in the top-right corner (full width on phones). Sits above modals. */
export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 top-4 z-[10010] flex flex-col items-end gap-3 sm:inset-x-auto sm:right-5 sm:top-5"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
