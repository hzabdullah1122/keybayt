export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n) => String(n).padStart(2, "0");

/** month is 0-based. */
export const toIsoDate = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;
export const toIsoMonth = (year, month) => `${year}-${pad(month + 1)}`;

/** Parse "YYYY-MM-DD" or "YYYY-MM" -> { year, month (0-based), day|null } or null. */
export function parseIso(value) {
  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value ?? "");
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) - 1, day: match[3] ? Number(match[3]) : null };
}

export const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/** Weekday (0 = Sunday) of the 1st of the month. */
export const firstWeekday = (year, month) => new Date(year, month, 1).getDay();

export function formatDisplay(value, mode) {
  const parsed = parseIso(value);
  if (!parsed) return "";
  const monthName = MONTHS[parsed.month];
  return mode === "month" || parsed.day === null
    ? `${monthName} ${parsed.year}`
    : `${pad(parsed.day)} ${monthName.slice(0, 3)} ${parsed.year}`;
}
