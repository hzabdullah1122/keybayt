/** Circular progress (CSS conic gradient, no SVG). */
export default function ReadinessRing({ percent }) {
  return (
    <div
      className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-primary) ${percent * 3.6}deg, var(--color-surface) 0deg)`,
      }}
    >
      <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-background">
        <span className="text-xl font-bold leading-none text-foreground">{percent}%</span>
        <span className="mt-0.5 text-[10px] text-muted">matched</span>
      </div>
    </div>
  );
}
