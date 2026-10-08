export const isEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Password rules shown to the user while typing. */
export const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "case", label: "Upper and lower case letters", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: "number", label: "A number", test: (v) => /\d/.test(v) },
];

/** 0..3 = how many password rules pass. */
export const passwordScore = (value = "") => PASSWORD_RULES.filter((r) => r.test(value)).length;
