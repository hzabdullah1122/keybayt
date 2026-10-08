/** Small titled block inside a form section (title, hint and an optional badge on the right). */
export default function SubHeading({ title, hint, badge }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
      {badge}
    </div>
  );
}
