"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Success follows the brand blue, error uses the danger red.
const STYLES = {
  success: {
    icon: Check,
    title: "text-primary",
    blob: "bg-primary/10",
    badge: "bg-primary ring-primary/10",
    bar: "bg-primary",
    border: "border-primary/10",
  },
  error: {
    icon: TriangleAlert,
    title: "text-danger",
    blob: "bg-danger/10",
    badge: "bg-danger ring-danger/10",
    bar: "bg-danger",
    border: "border-danger/10",
  },
};

/**
 * Brand toast: white card, soft coloured blobs, solid icon badge with a soft fade-in,
 * coloured title and a rounded drain bar. Slides in from the right; hover pauses everything.
 */
export default function Toast({ toast, onDismiss }) {
  const { type, title, message, duration } = toast;
  const style = STYLES[type];
  const Icon = style.icon;

  const [paused, setPaused] = useState(false);
  const remaining = useRef(duration);
  const startedAt = useRef(0);
  const dismissRef = useRef(onDismiss);

  useEffect(() => {
    dismissRef.current = onDismiss;
  });

  useEffect(() => {
    if (paused) return;
    startedAt.current = Date.now();
    const timer = setTimeout(() => dismissRef.current(), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [paused]);

  return (
    <motion.div
      layout
      role={type === "error" ? "alert" : "status"}
      initial={{ opacity: 0, x: 120 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 120, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      onHoverStart={() => setPaused(true)}
      onHoverEnd={() => setPaused(false)}
      className={cn(
        "group/toast pointer-events-auto relative w-[290px] overflow-hidden rounded-xl border bg-background shadow-2xl sm:w-[320px]",
        style.border,
      )}
    >
      {/* soft blobs behind the icon (decorative) */}
      <span
        className={cn(
          "pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-[58%_42%_55%_45%/48%_58%_42%_52%]",
          style.blob,
        )}
      />
      <span
        className={cn("pointer-events-none absolute -bottom-8 right-6 h-16 w-16 rounded-full", style.blob)}
      />
      <span
        className={cn("pointer-events-none absolute -right-3 -top-5 h-12 w-12 rounded-full opacity-70", style.blob)}
      />

      <div className="relative flex min-h-[62px] items-center gap-3 px-3.5 py-2.5 pr-8">
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ring-4",
            style.badge,
          )}
        >
          <Icon size={17} strokeWidth={2.5} />
        </motion.span>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <p className={cn("text-sm font-bold leading-tight", style.title)}>{title}</p>
          <p className="line-clamp-2 text-xs leading-snug text-muted">{message}</p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="absolute right-2 top-2 cursor-pointer rounded-md p-1 text-placeholder transition-colors hover:bg-surface hover:text-foreground"
        >
          <X size={13} />
        </button>
      </div>

      {/* drain bar */}
      <div className="mx-3.5 mb-2 h-[3px] overflow-hidden rounded-full bg-surface">
        <div
          className={cn("toast-progress h-full origin-left rounded-full", style.bar)}
          style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? "paused" : "running" }}
        />
      </div>
    </motion.div>
  );
}
