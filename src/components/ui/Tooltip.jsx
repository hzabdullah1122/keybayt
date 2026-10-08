"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Tooltip shown to the right of its child. Uses fixed positioning so it is
 * never clipped by scrolling/overflow parents (e.g. a collapsed sidebar).
 * Do not place it inside a transformed ancestor.
 */
export default function Tooltip({ label, disabled = false, children }) {
  const [pos, setPos] = useState(null);

  const show = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ top: rect.top + rect.height / 2, left: rect.right + 24 });
  };
  const hide = () => setPos(null);

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className="relative"
    >
      {children}
      <AnimatePresence>
        {pos && !disabled && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            style={{ top: pos.top, left: pos.left }}
            className="pointer-events-none fixed z-[10001] -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-white shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
