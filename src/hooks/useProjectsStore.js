"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { projectsService } from "@/services/projectsService";

/** All projects (drafts, in review, approved) with loading/error state and actions. */
export function useProjectsStore() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setItems(await projectsService.list());
      setError(null);
    } catch {
      setError("Could not load your projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load (async, so state is set after the promise resolves).
  useEffect(() => {
    let active = true;
    projectsService
      .list()
      .then((list) => active && setItems(list))
      .catch(() => active && setError("Could not load your projects."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const run = useCallback(
    async (action) => {
      const result = await action();
      await refresh();
      return result;
    },
    [refresh],
  );

  const save = useCallback(
    (payload) => run(() => projectsService.save(payload)),
    [run],
  );
  const setStatus = useCallback(
    (id, status) => run(() => projectsService.setStatus(id, status)),
    [run],
  );
  const remove = useCallback((id) => run(() => projectsService.remove(id)), [run]);

  const drafts = useMemo(() => items.filter((p) => p.status === "draft"), [items]);
  const reviews = useMemo(() => items.filter((p) => p.status === "review"), [items]);
  const approved = useMemo(() => items.filter((p) => p.status === "approved"), [items]);

  return { loading, error, refresh, all: items, drafts, reviews, approved, save, setStatus, remove };
}
