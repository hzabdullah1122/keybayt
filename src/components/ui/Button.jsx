import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";

const VARIANTS = {
  primary:
    "bg-button text-white hover:bg-button-hover active:bg-button-active disabled:bg-button-disabled",
  outline:
    "border border-border bg-background text-foreground hover:bg-surface disabled:opacity-50",
  danger: "bg-danger text-white hover:bg-danger-hover disabled:opacity-50",
  ghost: "text-foreground hover:bg-surface disabled:opacity-50",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon: LeftIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={16} className="text-current" />
      ) : (
        LeftIcon && <LeftIcon size={16} />
      )}
      {children}
    </button>
  );
}
