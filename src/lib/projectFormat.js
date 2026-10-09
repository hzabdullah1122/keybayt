import { formatDisplay } from "@/lib/dates";
import { formatNumber } from "@/lib/projectMetrics";

/** Value is empty when it is "", null/undefined or an empty list. */
export const isEmpty = (v) => v === "" || v === null || v === undefined || (Array.isArray(v) && v.length === 0);

/** "10 – 20 m²" | "10 m²" | null (when both are empty). */
export function rangeText(from, to, unit = "") {
  const a = from === "" || from == null ? null : Number(from);
  const b = to === "" || to == null ? null : Number(to);
  const suffix = unit ? ` ${unit}` : "";
  if (a !== null && b !== null) return a === b ? `${formatNumber(a)}${suffix}` : `${formatNumber(a)} – ${formatNumber(b)}${suffix}`;
  if (a !== null) return `From ${formatNumber(a)}${suffix}`;
  if (b !== null) return `Up to ${formatNumber(b)}${suffix}`;
  return null;
}

export const optionLabel = (list, value) => list.find((o) => o.value === value)?.label ?? null;

export const optionLabels = (list, values = []) =>
  list.filter((o) => values.includes(o.value)).map((o) => o.label);

export const dateText = (iso, mode = "date") => (iso ? formatDisplay(iso, mode) : null);

export const timestampText = (ms) =>
  new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Only http(s) links are rendered as clickable (blocks javascript: and other schemes). */
export function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
