import { cn } from "@/lib/utils";

export const YEARS_PER_PAGE = 12;

/** 3x4 year chooser starting at `startYear`. */
export default function YearGrid({ startYear, selectedYear, onPick }) {
  const years = Array.from({ length: YEARS_PER_PAGE }, (_, i) => startYear + i);
  return (
    <div className="grid grid-cols-3 gap-2 py-1">
      {years.map((year) => {
        const on = year === selectedYear;
        return (
          <button
            key={year}
            type="button"
            onClick={() => onPick(year)}
            className={cn(
              "h-10 cursor-pointer rounded-lg text-sm transition-colors",
              on
                ? "bg-primary font-semibold text-white"
                : "text-foreground hover:bg-primary-light hover:text-primary",
            )}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}
