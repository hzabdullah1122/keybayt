/**
 * TEMPORARY: while the backend is not ready, login accepts any email/password (no checks).
 * Set to true to bring back the real validation + account check.
 */
export const LOGIN_VALIDATION_ENABLED = false;

export const AUTH_ROUTES = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  afterLogin: "/dashboard",
};

/** Talking points shown on the brand panel next to the auth forms. */
export const SHOWCASE_STATS = [
  { value: "92%", label: "Average match score" },
  { value: "3x", label: "Faster lead response" },
  { value: "24/7", label: "Always-on listings" },
];
