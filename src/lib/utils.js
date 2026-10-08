import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names; later Tailwind classes override earlier conflicting ones. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Strip everything except digits. */
export function onlyDigits(value = "") {
  return String(value).replace(/\D/g, "");
}
