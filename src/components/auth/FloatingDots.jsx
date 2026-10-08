"use client";

import { motion } from "framer-motion";

// left %, top %, size px, duration s, delay s
const DOTS = [
  [8, 22, 6, 9, 0],
  [18, 64, 4, 7, 1.2],
  [28, 40, 8, 11, 0.6],
  [42, 14, 5, 8, 2],
  [58, 30, 4, 10, 0.3],
  [72, 12, 7, 12, 1.5],
  [86, 38, 5, 9, 0.9],
  [92, 70, 8, 11, 2.4],
  [12, 82, 6, 10, 1.8],
  [64, 78, 5, 8, 0.4],
  [48, 88, 7, 12, 1.1],
  [80, 90, 4, 7, 2.8],
];

/** Soft glowing dots drifting upwards behind the scene (decorative depth). */
export default function FloatingDots() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {DOTS.map(([left, top, size, duration, delay], i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-background/70"
          style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
          animate={{ y: [0, -36, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
