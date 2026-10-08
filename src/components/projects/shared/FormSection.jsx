/** White card wrapper for one numbered section of the project form. */
export default function FormSection({ id, title, description, children }) {
  return (
    <section
      id={id}
      className="flex scroll-mt-6 flex-col gap-6 rounded-2xl border border-border bg-background p-6 sm:p-7"
    >
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </header>
      {children}
    </section>
  );
}
