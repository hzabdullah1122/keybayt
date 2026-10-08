"use client";

import { motion } from "framer-motion";
import LitWindows from "@/components/auth/LitWindows";
import { cn } from "@/lib/utils";

/**
 * One 3D building (shaded top + two side faces with glowing windows) on the ground plane.
 * x/y/w/d are ground-plane px, h is the height in px. Must live inside a preserve-3d parent.
 */
const TONES = {
  light: {
    roof: "bg-gradient-to-br from-background to-primary-light/70",
    front: "bg-gradient-to-b from-primary-light to-background",
    side: "bg-gradient-to-r from-primary-light/90 to-background/65",
  },
  glass: {
    roof: "bg-gradient-to-br from-primary-light to-primary/30",
    front: "bg-gradient-to-b from-primary/35 to-primary-light",
    side: "bg-gradient-to-r from-primary/45 to-primary-light/80",
  },
};

/**
 * `base` lifts the box (for stepped towers), `tone` picks the glass/light look,
 * `bare` removes the window grid (spires).
 */
export default function IsoBox({
  x,
  y,
  w,
  d,
  h,
  base = 0,
  tone = "light",
  bare = false,
  delay = 0,
  index = 0,
}) {
  const t = TONES[tone];
  return (
    <motion.div
      initial={{ opacity: 0, z: -90 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="absolute"
      style={{ left: x, top: y, width: w, height: d, transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d", transform: `translateZ(${base}px)` }}
      >
      {/* roof */}
      <div
        className={cn(
          "absolute inset-0 border border-background/80",
          t.roof,
        )}
        style={{ transform: `translateZ(${h}px)` }}
      >
        {/* rooftop unit */}
        {!bare && (
          <span className="absolute left-[18%] top-[18%] h-[26%] w-[26%] bg-primary/25" />
        )}
      </div>

      {/* front face: lit side */}
      <div
        className={cn("absolute left-0", t.front)}
        style={{
          top: d,
          width: w,
          height: h,
          transformOrigin: "top",
          transform: "rotateX(90deg)",
        }}
      >
        {!bare && <span className="iso-windows absolute inset-0" />}
        {!bare && <LitWindows width={w} height={h} seed={index * 2 + 1} />}
      </div>

      {/* right face: shaded side */}
      <div
        className={cn("absolute", t.side)}
        style={{
          left: w,
          top: 0,
          width: h,
          height: d,
          transformOrigin: "left",
          transform: "rotateY(-90deg)",
        }}
      >
        {!bare && <span className="iso-windows absolute inset-0" />}
        {!bare && <LitWindows width={h} height={d} seed={index * 2 + 2} />}
      </div>
      </div>
    </motion.div>
  );
}
