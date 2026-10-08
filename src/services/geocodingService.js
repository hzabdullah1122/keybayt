/**
 * Address -> coordinates using OpenStreetMap Nominatim (free, no API key).
 * Keep requests low (the caller debounces). Swap for Google/Mapbox geocoding if needed.
 */
const ENDPOINT = "https://nominatim.openstreetmap.org/search";

const REVERSE_ENDPOINT = "https://nominatim.openstreetmap.org/reverse";

export const geocodingService = {
  /** Coordinates -> raw address parts { state, city, district } (English), or null. */
  async reverse(lat, lng, { signal } = {}) {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lng),
      format: "jsonv2",
      zoom: "16",
      addressdetails: "1",
      "accept-language": "en",
    });

    const res = await fetch(`${REVERSE_ENDPOINT}?${params}`, { signal });
    if (!res.ok) throw new Error("Could not read your location.");

    const { address } = await res.json();
    if (!address) return null;

    // OSM names often carry a suffix ("Lahore District", "Lahore City Tehsil").
    const clean = (name = "") => name.replace(/\s+(City\s+)?(District|Tehsil|Municipality)$/i, "").trim();

    // Detailed street address, e.g. "Abdul Haq Road, Johar Town L Block, Johar Town, Lahore".
    const street = [address.house_number, address.road].filter(Boolean).join(" ");
    const city = address.city || address.town || clean(address.county) || clean(address.municipality) || address.village || "";
    const detail = [street, address.neighbourhood, address.suburb, city].filter(Boolean);

    return {
      address: [...new Set(detail)].join(", "),
      countryCode: (address.country_code ?? "").toLowerCase(),
      state: address.state ?? address.region ?? "",
      city:
        address.city ||
        address.town ||
        clean(address.county) ||
        clean(address.municipality) ||
        address.village ||
        "",
      // District = administrative district (e.g. "Lahore District"). The local area
      // (Johar Town) goes into the full address; it is only used here when no district exists.
      district:
        address.county ||
        address.state_district ||
        address.suburb ||
        address.neighbourhood ||
        address.quarter ||
        address.city_district ||
        address.hamlet ||
        "",
    };
  },

  /** Returns { lat, lng, label } for the best match, or null when nothing is found. */
  async search(query, { signal, countryCode } = {}) {
    const params = new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "1",
      "accept-language": "en",
    });
    if (countryCode) params.set("countrycodes", countryCode);

    const res = await fetch(`${ENDPOINT}?${params}`, { signal });
    if (!res.ok) throw new Error("Address search failed.");

    const [first] = await res.json();
    if (!first) return null;
    return { lat: Number(first.lat), lng: Number(first.lon), label: first.display_name };
  },
};
