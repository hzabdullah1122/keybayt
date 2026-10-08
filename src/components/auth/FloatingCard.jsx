"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * White glass card that floats (gentle bob) and drifts with the mouse for a parallax feel.
 * `x`/`y` are motion values; `depth` scales how far this card moves.
 */
export default function FloatingCard({ children, className, x, y, delay = 0, bob = 8 }) {
  return (
    <motion.div style={{ x, y }} className={cn("absolute", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -bob, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.5 + delay },
          scale: { duration: 0.5, delay: 0.5 + delay },
          y: { duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay },
        }}
        className="rounded-2xl border border-background/60 bg-background/95 p-4 shadow-2xl backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
