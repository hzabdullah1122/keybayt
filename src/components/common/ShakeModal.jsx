"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useShake } from "@/hooks/useShake";
import { cn } from "@/lib/utils";

/**
 * Base modal. Clicking the backdrop shakes the dialog instead of closing it.
 * Close only via the X button (`onClose`) or the buttons you put inside.
 * Render inside <AnimatePresence> and conditionally on `open` for exit animation.
 */
export default function ShakeModal({
  children,
  onClose,
  maxWidth = 480,
  zIndex = 9999,
  className,
}) {
  const { shake, triggerShake, shakeAnimation, shakeTransition } = useShake();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-overlay backdrop-blur-sm"
      style={{ zIndex }}
      onClick={(e) => {
        e.stopPropagation();
        triggerShake();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1, ...shakeAnimation }}
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.1 } }}
        transition={shake ? shakeTransition : { duration: 0.18 }}
        className={cn("relative mx-4 w-full rounded-2xl bg-background shadow-2xl", className)}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 cursor-pointer rounded-full p-1.5 text-muted hover:bg-surface"
          >
            <X size={18} />
          </button>
        )}
        {children}
      </motion.div>
    </div>
  );
}
