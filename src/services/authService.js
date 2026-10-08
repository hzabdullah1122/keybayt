/**
 * Auth data layer. Until the backend exists, accounts and the session live in the browser
 * (localStorage / sessionStorage) and passwords are only stored as a SHA-256 hash.
 * Every function is async so it can be swapped for `apiClient` calls without touching callers.
 *
 * Session shape: { userId, name, email, company }
 */
import { LOGIN_VALIDATION_ENABLED } from "@/constants/auth";

const USERS_KEY = "keybayt-users";
const SESSION_KEY = "keybayt-session";
export const SESSION_EVENT = "keybayt-session-change";

const readJson = (storage, key, fallback) => {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function hash(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function startSession(user, remember) {
  const session = { userId: user.id, name: user.name, email: user.email, company: user.company };
  const storage = remember ? localStorage : sessionStorage;
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  storage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(SESSION_EVENT));
  return session;
}

/** Raw session string (or null). Used by useSession so React can compare snapshots cheaply. */
export function readSessionRaw() {
  try {
    return localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export const authService = {
  async signup({ name, company, companyType, email, phone, password }) {
    await wait(700);
    const users = readJson(localStorage, USERS_KEY, []);
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === cleanEmail)) {
      throw new Error("An account with this email already exists.");
    }
    const user = {
      id: `usr-${Date.now().toString(36)}`,
      name: name.trim(),
      company: company.trim(),
      companyType,
      email: cleanEmail,
      phone,
      passwordHash: await hash(password),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    return startSession(user, true);
  },

  async login({ email, password, remember }) {
    await wait(600);

    // Temporary open login (see LOGIN_VALIDATION_ENABLED): any email works, no account needed.
    if (!LOGIN_VALIDATION_ENABLED) {
      const cleanEmail = email.trim().toLowerCase() || "guest@keybayt.com";
      return startSession(
        { id: "demo-user", name: cleanEmail.split("@")[0], email: cleanEmail, company: "Demo Company" },
        remember,
      );
    }

    const users = readJson(localStorage, USERS_KEY, []);
    const user = users.find((u) => u.email === email.trim().toLowerCase());
    if (!user || user.passwordHash !== (await hash(password))) {
      throw new Error("Incorrect email or password.");
    }
    return startSession(user, remember);
  },

  /** Always resolves, so the screen never reveals whether an email has an account. */
  async requestPasswordReset() {
    await wait(700);
    return true;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event(SESSION_EVENT));
  },
};
