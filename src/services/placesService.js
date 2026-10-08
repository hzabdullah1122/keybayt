/**
 * Place name search (regions, cities, districts) using Photon (OpenStreetMap, free, no key).
 * Works worldwide; results can be narrowed by country / region and biased to a location.
 */
const ENDPOINT = "https://photon.komoot.io/api/";

const LAYERS = {
  region: ["state"],
  city: ["city"],
  district: ["county", "district", "locality"],
};

const same = (a = "", b = "") => a.toLowerCase() === b.toLowerCase();

export const placesService = {
  /**
   * level: "region" | "city" | "district".
   * ctx: { countryCode, region, city, near: { lat, lng } }. Returns unique names (strings).
   */
  async search(level, query, { countryCode, region, city, near, signal } = {}) {
    const params = new URLSearchParams({ q: query, limit: "15", lang: "en" });
    LAYERS[level].forEach((layer) => params.append("layer", layer));
    if (near) {
      params.set("lat", String(near.lat));
      params.set("lon", String(near.lng));
    }

    const res = await fetch(`${ENDPOINT}?${params}`, { signal });
    if (!res.ok) throw new Error("Place search failed.");
    const { features = [] } = await res.json();

    let list = features.map((f) => f.properties);
    if (countryCode) list = list.filter((p) => same(p.countrycode, countryCode));
    if (level !== "region" && region) list = list.filter((p) => !p.state || same(p.state, region));
    // Districts inside the chosen city first.
    if (level === "district" && city) {
      list = [...list.filter((p) => same(p.city, city)), ...list.filter((p) => !same(p.city, city))];
    }

    return [...new Set(list.map((p) => p.name).filter(Boolean))].slice(0, 10);
  },
};
