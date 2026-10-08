"use client";

import Input from "@/components/ui/Input";
import { onlyDigits } from "@/lib/utils";

const ALLOWED_KEYS = [
  "Backspace", "Delete", "Tab", "Enter", "Escape",
  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End",
];

/**
 * Digits-only input (phone, OTP, age, amount...).
 * Blocks non-digit keys and sanitizes typed/pasted values.
 * `onChange` receives the cleaned string value (not the event).
 */
export default function NumberInput({ value, onChange, maxLength, ...props }) {
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey || ALLOWED_KEYS.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const handleChange = (e) => {
    let next = onlyDigits(e.target.value);
    if (maxLength) next = next.slice(0, maxLength);
    onChange?.(next);
  };

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={value}
      maxLength={maxLength}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
}
