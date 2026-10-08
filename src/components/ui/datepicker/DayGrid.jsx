import { WEEKDAYS, daysInMonth, firstWeekday, toIsoDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

/** Day cells of one month. selected/min/max are "YYYY-MM-DD" strings. */
export default function DayGrid({ year, month, selected, min, max, onPick }) {
  const todayIso = (() => {
    const t = new Date();
    return toIsoDate(t.getFullYear(), t.getMonth(), t.getDate());
  })();

  const blanks = Array.from({ length: firstWeekday(year, month) });
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-1 grid grid-cols-7">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-center text-xs font-medium text-placeholder">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {blanks.map((_, i) => (
          <span key={`b${i}`} />
        ))}
        {days.map((day) => {
          const iso = toIsoDate(year, month, day);
          const isSelected = iso === selected;
          const disabled = (min && iso < min) || (max && iso > max);
          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              className={cn(
                "mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors disabled:cursor-not-allowed disabled:text-placeholder/50",
                isSelected
                  ? "bg-primary font-semibold text-white"
                  : "text-foreground hover:bg-primary-light hover:text-primary disabled:hover:bg-transparent",
                !isSelected && iso === todayIso && "border border-primary text-primary",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
