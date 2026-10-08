import ChecklistItem from "@/components/projects/shared/ChecklistItem";

/** Weighted match-score coverage with progress bar. */
export default function MatchReadinessCard({ checks, percent }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-foreground">Match readiness</h2>
        <p className="text-xs leading-relaxed text-muted">
          Customers are scored on these factors, weighted as shown. Fill them all so the project
          can reach a full match.
        </p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold leading-none text-foreground">{percent}%</span>
        <span className="text-sm text-muted">of the match score covered</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="flex flex-col gap-2.5">
        {checks.map((check) => (
          <ChecklistItem key={check.label} label={check.label} done={check.done} weight={check.weight} />
        ))}
      </ul>
    </div>
  );
}
