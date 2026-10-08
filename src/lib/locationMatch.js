/**
 * Build select options from names. If `detected` is given it is put first (added when missing)
 * (it is the user's current place). `current` (the chosen value) is
 * always kept selectable.
 */
export function toLocationOptions(names = [], detected = "", current = "") {
  const all = current && !names.includes(current) ? [...names, current] : names;
  const rest = all.filter((n) => n && n !== detected);
  const options = rest.map((name) => ({ value: name, label: name }));
  return detected ? [{ value: detected, label: detected }, ...options] : options;
}
