import { MONTHS } from "@/lib/dates";
import { cn } from "@/lib/utils";

/** 3x4 month chooser for one year. selectedMonth is 0-based or null. */
export default function MonthGrid({ selectedMonth, onPick }) {
  return (
    <div className="grid grid-cols-3 gap-2 py-1">
      {MONTHS.map((name, index) => {
        const on = index === selectedMonth;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onPick(index)}
            className={cn(
              "h-10 cursor-pointer rounded-lg text-sm transition-colors",
              on
                ? "bg-primary font-semibold text-white"
                : "text-foreground hover:bg-primary-light hover:text-primary",
            )}
          >
            {name.slice(0, 3)}
          </button>
        );
      })}
    </div>
  );
}
