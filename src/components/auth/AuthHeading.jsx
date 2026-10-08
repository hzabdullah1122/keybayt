/** Title + subtitle on top of every auth form. */
export default function AuthHeading({ title, subtitle, icon: Icon }) {
  return (
    <div className="mb-7 flex flex-col gap-2">
      {Icon && (
        <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Icon size={24} />
        </span>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
      {subtitle && <p className="text-sm leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
