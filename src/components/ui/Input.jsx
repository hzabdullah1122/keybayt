import { cn } from "@/lib/utils";

export default function Input({
  label,
  error,
  leftIcon: LeftIcon,
  className,
  wrapperClassName,
  id,
  ref,
  ...props
}) {
  const inputId = id || props.name;
  return (
    <div className={cn("flex w-full flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-placeholder"
          />
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-placeholder focus:border-primary disabled:bg-surface disabled:text-muted",
            error ? "border-danger" : "border-border",
            LeftIcon && "pl-9",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
