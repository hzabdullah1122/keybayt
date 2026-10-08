import { cn } from "@/lib/utils";

export default function Textarea({ label, error, className, wrapperClassName, id, rows = 4, ...props }) {
  const textareaId = id || props.name;
  return (
    <div className={cn("flex w-full flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          "w-full resize-y rounded-lg border bg-background px-3 py-2.5 text-sm leading-relaxed outline-none transition-colors placeholder:text-placeholder focus:border-primary",
          error ? "border-danger" : "border-border",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
