/** White card with an icon + title header. Used for every block of the project detail page. */
export default function DetailCard({ icon: Icon, title, action, children }) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 sm:p-6">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Icon size={18} />
            </span>
          )}
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
