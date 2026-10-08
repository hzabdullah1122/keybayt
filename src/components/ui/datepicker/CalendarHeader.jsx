import { ChevronLeft, ChevronRight } from "lucide-react";

/** Prev / title / next row shared by the day, month and year views. */
export default function CalendarHeader({ title, onTitleClick, onPrev, onNext, titleLabel }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-1">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary-light hover:text-primary"
      >
        <ChevronLeft size={18} />
      </button>
      {onTitleClick ? (
        <button
          type="button"
          onClick={onTitleClick}
          aria-label={titleLabel}
          className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary-light hover:text-primary"
        >
          {title}
        </button>
      ) : (
        <span className="px-3 py-1.5 text-sm font-semibold text-foreground">{title}</span>
      )}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary-light hover:text-primary"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
