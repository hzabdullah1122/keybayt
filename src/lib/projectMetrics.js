import { MATCH_WEIGHTS } from "@/constants/projects";

const toNumber = (v) => {
  const n = parseInt(String(v ?? "").replace(/\D/g, ""), 10);
  return Number.isNaN(n) ? null : n;
};

/** True when a map pin (lat/lng) has been placed. */
export const hasPin = (values) => values.lat !== null && values.lng !== null;

export const formatNumber = (n) => (n === null ? "…" : n.toLocaleString("en-US"));

/** Max lower than min is invalid. */
export function isRangeInvalid(min, max) {
  const a = toNumber(min);
  const b = toNumber(max);
  return a !== null && b !== null && b < a;
}

/** Lowest/highest across all selected unit types, plus per-field completeness. */
export function summarizeUnits(types, units) {
  const prices = [];
  const areas = [];
  let totalUnits = 0;
  let availableUnits = 0;
  let allPrice = types.length > 0;
  let allArea = types.length > 0;
  let allRooms = true;

  types.forEach((type) => {
    const u = units[type] ?? {};
    const minP = toNumber(u.minPrice);
    const maxP = toNumber(u.maxPrice);
    const minA = toNumber(u.minArea);
    const maxA = toNumber(u.maxArea);
    totalUnits += toNumber(u.total) ?? 0;
    availableUnits += toNumber(u.available) ?? 0;

    if (minP === null || maxP === null || maxP < minP) allPrice = false;
    else prices.push(minP, maxP);

    if (minA === null || maxA === null || maxA < minA) allArea = false;
    else areas.push(minA, maxA);

    if (type !== "land" && toNumber(u.bedFrom) === null && toNumber(u.bedTo) === null) {
      allRooms = false;
    }
  });

  const range = (list) => (list.length ? [Math.min(...list), Math.max(...list)] : [null, null]);
  return {
    allPrice,
    allArea,
    allRooms,
    totalUnits,
    availableUnits,
    priceRange: range(prices),
    areaRange: range(areas),
  };
}

/** Match readiness checklist + percentage + items required before review. */
export function getReadiness(values) {
  const { types, units, features, status } = values;
  const pinned = hasPin(values);
  const { allPrice, allArea, allRooms } = summarizeUnits(types, units);
  const onlyLand = types.length === 1 && types[0] === "land";

  const checks = [
    { label: "Location (map pin)", weight: MATCH_WEIGHTS.location, done: pinned },
    { label: "Price for every unit type", weight: MATCH_WEIGHTS.price, done: allPrice },
    { label: "Property type", weight: MATCH_WEIGHTS.type, done: types.length > 0 },
    { label: "Area for every unit type", weight: MATCH_WEIGHTS.area, done: allArea },
    {
      label: onlyLand ? "Bedrooms and bathrooms (not needed)" : "Bedrooms and bathrooms",
      weight: MATCH_WEIGHTS.rooms,
      done: types.length > 0 && (onlyLand || allRooms),
    },
    { label: "Features and amenities", weight: MATCH_WEIGHTS.features, done: features.length > 0 },
    { label: "Project status", weight: MATCH_WEIGHTS.status, done: Boolean(status) },
  ];
  const percent = checks.reduce((sum, c) => sum + (c.done ? c.weight : 0), 0);

  const required = [
    { label: "Cover image", done: Boolean(values.cover) },
    { label: "Advertising license (REGA)", done: Boolean(values.adNumber.trim()) },
  ];
  if (status !== "ready") {
    required.push({ label: "Off-plan sales license (Wafi)", done: Boolean(values.wafiNumber.trim()) });
  }
  if (values.companyType === "broker") {
    required.push({ label: "Authorization from the developer", done: Boolean(values.authFile) });
  }

  return { checks, percent, required };
}

/** Which wizard steps are complete (used for the stepper ticks). */
export function getStepStatus(values) {
  const { allPrice, allArea } = summarizeUnits(values.types, values.units);
  const isBroker = values.companyType === "broker";
  const developerOk = !isBroker || Boolean(values.developerId || values.devName.trim());

  return {
    basic: Boolean(
      values.name.trim() &&
        values.description.trim() &&
        values.types.length > 0 &&
        developerOk,
    ),
    location: Boolean(values.region && values.city && values.district && hasPin(values)),
    units: allPrice && allArea && values.payments.length > 0,
    specs: Boolean(values.landAreaFrom || values.age || values.facades.length > 0),
    amenities: values.features.length > 0,
    licenses: Boolean(
      values.adNumber.trim() && (values.status === "ready" || values.wafiNumber.trim()),
    ),
    media: Boolean(values.cover),
  };
}
