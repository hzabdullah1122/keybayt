/** Key figure tile used in the hero: icon, label, big value and an optional note. */
export default function StatTile({ icon: Icon, label, value, note }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface/60 p-4">
      <span className="flex items-center gap-2 text-xs font-medium text-muted">
        <Icon size={14} className="text-primary" />
        {label}
      </span>
      <span className="text-lg font-bold leading-tight text-foreground">{value}</span>
      {note && <span className="text-xs text-muted">{note}</span>}
    </div>
  );
}
