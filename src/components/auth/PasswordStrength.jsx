import { Check } from "lucide-react";
import { PASSWORD_RULES, passwordScore } from "@/lib/validators";
import { cn } from "@/lib/utils";

const BAR_COLORS = ["bg-danger", "bg-warning", "bg-success"];

/** 3-segment strength bar + checklist of the password rules. */
export default function PasswordStrength({ value }) {
  const score = passwordScore(value);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex gap-1.5">
        {PASSWORD_RULES.map((rule, i) => (
          <span
            key={rule.id}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              value && i < score ? BAR_COLORS[Math.max(score - 1, 0)] : "bg-border",
            )}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-1">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(value);
          return (
            <li
              key={rule.id}
              className={cn("flex items-center gap-2 text-xs", ok ? "text-success" : "text-muted")}
            >
              <Check size={13} strokeWidth={3} className={ok ? "opacity-100" : "opacity-30"} />
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
