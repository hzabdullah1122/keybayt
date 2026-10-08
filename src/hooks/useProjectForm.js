"use client";

import { useCallback, useMemo, useState } from "react";
import { EMPTY_UNIT, INITIAL_PROJECT_FORM } from "@/constants/projects";
import { getReadiness } from "@/lib/projectMetrics";

const INITIAL_SNAPSHOT = JSON.stringify(INITIAL_PROJECT_FORM);

/** All Add Project form state + helpers. State lives here so it survives tab switches. */
export function useProjectForm() {
  const [values, setValues] = useState(INITIAL_PROJECT_FORM);

  const set = useCallback((key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggle = useCallback((key, item) => {
    setValues((prev) => {
      const list = prev[key];
      return { ...prev, [key]: list.includes(item) ? list.filter((x) => x !== item) : [...list, item] };
    });
  }, []);

  const toggleType = useCallback((type) => {
    setValues((prev) => {
      const selected = prev.types.includes(type);
      return {
        ...prev,
        types: selected ? prev.types.filter((t) => t !== type) : [...prev.types, type],
        units: prev.units[type] ? prev.units : { ...prev.units, [type]: { ...EMPTY_UNIT } },
      };
    });
  }, []);

  const setUnit = useCallback((type, field, value) => {
    setValues((prev) => ({
      ...prev,
      units: { ...prev.units, [type]: { ...prev.units[type], [field]: value } },
    }));
  }, []);

  const setNearby = useCallback((place, value) => {
    setValues((prev) => ({ ...prev, nearby: { ...prev.nearby, [place]: value } }));
  }, []);

  const setRegion = useCallback((region) => {
    setValues((prev) => ({ ...prev, region, city: "", district: "" }));
  }, []);

  const setCity = useCallback((city) => {
    setValues((prev) => ({ ...prev, city, district: "" }));
  }, []);

  /** Pre-fill region/city/district from the user's location, only if nothing is chosen yet. */
  const fillLocationIfEmpty = useCallback((info) => {
    setValues((prev) =>
      prev.region || !info.region
        ? prev
        : {
            ...prev,
            region: info.region,
            city: info.city,
            district: info.district,
            address: prev.address || info.address || "",
          },
    );
  }, []);

  const reset = useCallback(() => setValues(INITIAL_PROJECT_FORM), []);
  const load = useCallback((saved) => setValues({ ...INITIAL_PROJECT_FORM, ...saved }), []);

  const isDirty = useMemo(() => JSON.stringify(values) !== INITIAL_SNAPSHOT, [values]);
  const readiness = useMemo(() => getReadiness(values), [values]);

  return {
    values,
    set,
    toggle,
    toggleType,
    setUnit,
    setNearby,
    setRegion,
    setCity,
    fillLocationIfEmpty,
    reset,
    load,
    isDirty,
    readiness,
  };
}
