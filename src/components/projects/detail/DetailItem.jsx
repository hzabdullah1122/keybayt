import { isEmpty } from "@/lib/projectFormat";

/** Label + value. Empty values show a muted "Not provided". */
export default function DetailItem({ label, value, children }) {
  const content = children ?? value;
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-placeholder">{label}</dt>
      <dd className="min-w-0 break-words text-sm font-medium text-foreground">
        {isEmpty(content) ? <span className="font-normal text-muted">Not provided</span> : content}
      </dd>
    </div>
  );
}

/** Responsive definition-list grid for DetailItems. */
export function DetailGrid({ children, columns = "sm:grid-cols-2 2xl:grid-cols-3" }) {
  return <dl className={`grid grid-cols-1 gap-x-6 gap-y-5 ${columns}`}>{children}</dl>;
}
