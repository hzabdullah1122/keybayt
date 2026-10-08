"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = {
  success: { icon: Check, dot: "bg-success", bar: "bg-success" },
  error: { icon: X, dot: "bg-danger", bar: "bg-danger" },
};

/**
 * Clean toast: white card, small coloured status dot, title + message, thin drain bar.
 * Hover pauses the timer and the bar.
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
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      onHoverStart={() => setPaused(true)}
      onHoverEnd={() => setPaused(false)}
      className="pointer-events-auto relative w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg sm:w-[360px]"
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white",
            style.dot,
          )}
        >
          <Icon size={12} strokeWidth={3.5} />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold leading-tight text-foreground">{title}</p>
          <p className="text-[13px] leading-snug text-muted">{message}</p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="-mr-1 cursor-pointer rounded-md p-1 text-placeholder transition-colors hover:bg-surface hover:text-foreground"
        >
          <X size={14} />
        </button>
      </div>

      <div className="h-0.5 w-full bg-surface">
        <div
          className={cn("toast-progress h-full origin-left", style.bar)}
          style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? "paused" : "running" }}
        />
      </div>
    </motion.div>
  );
}
