"use client";

import { motion } from "framer-motion";
import IsoBox from "@/components/auth/IsoBox";

// Buildings on the ground plane: x, y, width, depth, height (+ base lift, tone, bare).
const BUILDINGS = [
  { x: 34, y: 36, w: 96, d: 96, h: 96 },
  // tallest tower: wide base with a glass upper block
  { x: 160, y: 42, w: 84, d: 84, h: 110 },
  { x: 172, y: 54, w: 60, d: 60, h: 62, base: 110, tone: "glass" },
  { x: 268, y: 36, w: 88, d: 88, h: 70, tone: "glass" },
  { x: 42, y: 168, w: 90, d: 84, h: 54 },
  { x: 166, y: 166, w: 110, d: 96, h: 120, tone: "glass" },
  { x: 300, y: 176, w: 64, d: 64, h: 42 },
];

/**
 * Isometric city block. `rotateX` / `rotateY` are framer motion values driven by the mouse,
 * so the whole scene tilts in 3D when the pointer moves over the panel.
 */
export default function IsoScene({ rotateX, rotateY }) {
  return (
    <div className="relative h-[400px] w-[400px]" style={{ perspective: 1600 }}>
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(60deg) rotateZ(-42deg) translateZ(-10px)",
          }}
        >
          {/* ground: outer rim, inner plate, soft glow */}
          <div className="absolute -inset-8 rounded-[48px] border border-background/25 bg-background/10" />
          <div className="absolute -inset-3 rounded-[38px] border border-background/20 bg-primary-hover/50" />
          <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_50%_40%,var(--color-primary-light),transparent_70%)] opacity-30" />

          {/* road between the two building rows */}
          <div className="absolute -inset-x-3 top-[142px] flex h-5 items-center bg-background/15">
            <div className="h-px w-full border-t border-dashed border-background/60" />
          </div>

          {/* soft ground shadows */}
          {BUILDINGS.filter((b) => !b.base).map((b, i) => (
            <div
              key={`shadow-${i}`}
              className="absolute rounded-lg bg-primary-hover/80 blur-md"
              style={{ left: b.x + 14, top: b.y + 18, width: b.w, height: b.d }}
            />
          ))}

          {BUILDINGS.map((b, i) => (
            <IsoBox key={i} {...b} index={i} delay={0.12 * i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
