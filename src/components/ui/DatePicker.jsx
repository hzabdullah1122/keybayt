"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, X } from "lucide-react";
import CalendarHeader from "@/components/ui/datepicker/CalendarHeader";
import DayGrid from "@/components/ui/datepicker/DayGrid";
import MonthGrid from "@/components/ui/datepicker/MonthGrid";
import YearGrid, { YEARS_PER_PAGE } from "@/components/ui/datepicker/YearGrid";
import { MONTHS, formatDisplay, parseIso, toIsoDate, toIsoMonth } from "@/lib/dates";
import { cn } from "@/lib/utils";

const POPOVER_HEIGHT = 360;

/**
 * Custom date / month picker (no native input).
 *  mode="date"  -> value "YYYY-MM-DD" (days -> month -> year views)
 *  mode="month" -> value "YYYY-MM"    (month -> year views)
 * onChange receives the ISO string ("" when cleared). min/max are ISO "YYYY-MM-DD" (date mode).
 */
export default function DatePicker({
  label,
  value = "",
  onChange,
  mode = "date",
  placeholder,
  min,
  max,
  error,
  disabled = false,
  className,
}) {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [view, setView] = useState("days");
  const [cursor, setCursor] = useState({ year: 2026, month: 0 });
  const [yearStart, setYearStart] = useState(2026);

  const parsed = parseIso(value);
  const isMonthMode = mode === "month";
  const startView = isMonthMode ? "months" : "days";

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const openPicker = () => {
    if (disabled) return;
    const now = new Date();
    const base = parsed ?? { year: now.getFullYear(), month: now.getMonth() };
    setCursor({ year: base.year, month: base.month });
    setYearStart(base.year - 4);
    setView(startView);

    const rect = rootRef.current.getBoundingClientRect();
    setOpenUp(window.innerHeight - rect.bottom < POPOVER_HEIGHT && rect.top > POPOVER_HEIGHT);
    setOpen(true);
  };

  const commit = (iso) => {
    onChange?.(iso);
    setOpen(false);
  };

  const shiftMonth = (delta) =>
    setCursor(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const renderView = () => {
    if (view === "years") {
      return (
        <>
          <CalendarHeader
            title={`${yearStart} – ${yearStart + YEARS_PER_PAGE - 1}`}
            onPrev={() => setYearStart((y) => y - YEARS_PER_PAGE)}
            onNext={() => setYearStart((y) => y + YEARS_PER_PAGE)}
          />
          <YearGrid
            startYear={yearStart}
            selectedYear={parsed?.year}
            onPick={(year) => {
              setCursor((c) => ({ ...c, year }));
              setView("months");
            }}
          />
        </>
      );
    }

    if (view === "months") {
      return (
        <>
          <CalendarHeader
            title={String(cursor.year)}
            titleLabel="Choose year"
            onTitleClick={() => {
              setYearStart(cursor.year - 4);
              setView("years");
            }}
            onPrev={() => setCursor((c) => ({ ...c, year: c.year - 1 }))}
            onNext={() => setCursor((c) => ({ ...c, year: c.year + 1 }))}
          />
          <MonthGrid
            selectedMonth={parsed?.year === cursor.year ? parsed.month : null}
            onPick={(month) => {
              if (isMonthMode) {
                commit(toIsoMonth(cursor.year, month));
              } else {
                setCursor((c) => ({ ...c, month }));
                setView("days");
              }
            }}
          />
        </>
      );
    }

    return (
      <>
        <CalendarHeader
          title={`${MONTHS[cursor.month]} ${cursor.year}`}
          titleLabel="Choose month and year"
          onTitleClick={() => setView("months")}
          onPrev={() => shiftMonth(-1)}
          onNext={() => shiftMonth(1)}
        />
        <DayGrid
          year={cursor.year}
          month={cursor.month}
          selected={value}
          min={min}
          max={max}
          onPick={commit}
        />
      </>
    );
  };

  const display = formatDisplay(value, mode);
  const defaultPlaceholder = isMonthMode ? "Select month" : "Select date";

  return (
    <div ref={rootRef} className={cn("relative flex w-full min-w-0 flex-col gap-1.5", className)}>
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openPicker())}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-lg border bg-background pl-3 pr-9 text-left text-sm outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-surface",
            error ? "border-danger" : open ? "border-primary" : "border-border",
          )}
        >
          <CalendarDays size={16} className="shrink-0 text-muted" />
          <span className={cn("truncate", !display && "text-placeholder")}>
            {display || placeholder || defaultPlaceholder}
          </span>
        </button>
        {display && !disabled && (
          <button
            type="button"
            onClick={() => onChange?.("")}
            aria-label="Clear"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-placeholder transition-colors hover:bg-surface hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: openUp ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUp ? 6 : -6 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute left-0 z-50 w-[296px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-background p-3 shadow-lg",
              openUp ? "bottom-full mb-1" : "top-full mt-1",
            )}
          >
            {renderView()}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
