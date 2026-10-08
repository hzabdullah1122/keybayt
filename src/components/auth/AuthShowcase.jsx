"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { MapPin, Sparkles, Tag, UserRoundCheck } from "lucide-react";
import FloatingDots from "@/components/auth/FloatingDots";
import FloatingCard from "@/components/auth/FloatingCard";
import IsoScene from "@/components/auth/IsoScene";
import { LOGOS } from "@/constants/navigation";
import { SHOWCASE_STATS } from "@/constants/auth";

const SPRING = { stiffness: 90, damping: 18, mass: 0.6 };

/** Blue brand panel: 3D city block that tilts with the mouse + floating product cards. */
export default function AuthShowcase() {
  const reduceMotion = useReducedMotion();

  // Pointer position inside the panel, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const nearX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const nearY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const farX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const farY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  // Light glare that follows the pointer (percent position inside the panel).
  const glareX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, color-mix(in srgb, white 20%, transparent), transparent 62%)`;

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-primary p-10 text-white 2xl:p-14"
    >
      {/* soft light + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,var(--color-primary-hover),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_95%,var(--color-primary-hover),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

      <FloatingDots />
      {!reduceMotion && (
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
      )}

      <div className="relative z-10">
        <Image
          src={LOGOS.completeWhite}
          alt="Keybayt"
          width={297}
          height={108}
          priority
          className="h-12 w-auto"
        />
      </div>

      {/* 3D scene + floating cards */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-6">
        <div className="relative scale-[0.72] xl:scale-[0.86] 2xl:scale-100">
          <IsoScene rotateX={reduceMotion ? 0 : rotateX} rotateY={reduceMotion ? 0 : rotateY} />

          {/* map pin hovering over the tallest tower */}
          <motion.div
            style={{ x: reduceMotion ? 0 : nearX, y: reduceMotion ? 0 : nearY }}
            className="absolute left-[24%] top-[-11%] z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary shadow-2xl"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-background/50" />
              <MapPin size={22} className="relative" fill="currentColor" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          <FloatingCard
            x={reduceMotion ? 0 : nearX}
            y={reduceMotion ? 0 : nearY}
            className="-right-8 -top-2 w-52"
            bob={9}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Sparkles size={18} />
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-muted">Match score</span>
                <span className="text-lg font-bold leading-tight text-foreground">92%</span>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
              <div className="h-full w-[92%] rounded-full bg-primary" />
            </div>
          </FloatingCard>

          <FloatingCard
            x={reduceMotion ? 0 : farX}
            y={reduceMotion ? 0 : farY}
            className="-right-10 bottom-16"
            delay={1.1}
            bob={6}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning-light text-warning">
                <Tag size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] text-muted">Starting from</span>
                <span className="text-sm font-bold leading-tight text-foreground">SAR 1.2M</span>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            x={reduceMotion ? 0 : farX}
            y={reduceMotion ? 0 : farY}
            className="-left-14 bottom-2 w-60"
            delay={0.6}
            bob={7}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success-light text-success">
                <UserRoundCheck size={18} />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-foreground">New interested lead</span>
                <span className="truncate text-xs text-muted">Asked about Al Noor Residences</span>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight 2xl:text-4xl">
            List smarter.
            <br />
            Match faster.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/80">
            Publish every unit type with its own price, and let Keybayt match your project to the
            customers most likely to buy.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-5">
          {SHOWCASE_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-bold"
              >
                {stat.value}
              </motion.span>
              <span className="text-xs text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
