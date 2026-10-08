import { cn } from "@/lib/utils";

/** Label for custom controls (chips, ranges, uploads) with optional required star and hint. */
export default function FieldLabel({ children, required = false, hint, htmlFor, className }) {
  return (
    <label htmlFor={htmlFor} className={cn("text-sm font-medium text-foreground", className)}>
      {children}
      {required && <span className="ml-0.5 text-danger">*</span>}
      {hint && <span className="ml-1.5 font-normal text-muted">{hint}</span>}
    </label>
  );
}
