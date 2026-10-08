/**
 * Projects data layer. Until the backend exists this keeps projects in localStorage;
 * every function is async so it can be swapped for `apiClient` calls without touching callers.
 *
 * Project shape: { id, status: "draft" | "review" | "approved", values, createdAt, updatedAt }
 * Demo projects (SAMPLE_PROJECTS, read-only) are appended to the list for now.
 */
import { SAMPLE_PROJECTS } from "@/constants/sampleProjects";

const STORAGE_KEY = "keybayt-projects";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    throw new Error("Could not save the project in this browser.");
  }
}

const newId = () => `prj-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/** Drafts saved before the single name/description fields used nameEn/descEn. */
function migrate(project) {
  const { nameEn, descEn, nameAr, descAr, ...values } = project.values;
  return {
    ...project,
    values: { ...values, name: values.name ?? nameEn ?? "", description: values.description ?? descEn ?? "" },
  };
}

export const projectsService = {
  async list() {
    return [...read().map(migrate), ...SAMPLE_PROJECTS].sort((a, b) => b.updatedAt - a.updatedAt);
  },

  /** Create (no id) or update (id) a project with the given status. */
  async save({ id, status, values }) {
    const items = read();
    const now = Date.now();
    const existing = items.find((p) => p.id === id);

    if (existing) {
      Object.assign(existing, { status, values, updatedAt: now });
      write(items);
      return existing;
    }

    const created = { id: newId(), status, values, createdAt: now, updatedAt: now };
    write([...items, created]);
    return created;
  },

  async setStatus(id, status) {
    const items = read();
    const target = items.find((p) => p.id === id);
    if (target) Object.assign(target, { status, updatedAt: Date.now() });
    write(items);
    return target;
  },

  async remove(id) {
    write(read().filter((p) => p.id !== id));
  },
};
