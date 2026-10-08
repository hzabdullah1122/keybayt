"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useShake } from "@/hooks/useShake";

/** Full-size image preview. Close with the X button or Escape; backdrop click shakes. */
export default function ImagePreviewModal({ open, src, alt = "", onClose }) {
  const { shake, triggerShake, shakeAnimation, shakeTransition } = useShake();

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
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
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute -right-3 -top-3 cursor-pointer rounded-full bg-background p-1.5 shadow-md hover:bg-surface"
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
