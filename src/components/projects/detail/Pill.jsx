/** Small rounded label (types, payment options, facades...). */
export default function Pill({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground">
      {Icon && <Icon size={13} className="text-primary" />}
      {children}
    </span>
  );
}
