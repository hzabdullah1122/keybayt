import { INITIAL_PROJECT_FORM } from "@/constants/projects";

/**
 * Demo projects shown in the list until the backend exists.
 * They are read-only (id starts with "sample-"). Delete this file + its use in
 * projectsService.list() to remove them.
 */
const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

const unit = (overrides) => ({
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  total: "",
  available: "",
  bedFrom: "",
  bedTo: "",
  bathFrom: "",
  bathTo: "",
  ...overrides,
});

const make = (id, status, daysAgo, values) => ({
  id: `sample-${id}`,
  sample: true,
  status,
  createdAt: now - (daysAgo + 10) * DAY,
  updatedAt: now - daysAgo * DAY,
  values: { ...INITIAL_PROJECT_FORM, ...values },
});

export const SAMPLE_PROJECTS = [
  make("noor", "approved", 2, {
    name: "Al Noor Residences",
    companyType: "developer",
    types: ["apartments", "villa"],
    status: "under",
    region: "Riyadh",
    city: "Riyadh",
    district: "Al Olaya",
    lat: 24.7136,
    lng: 46.6753,
    units: {
      apartments: unit({ minPrice: "650000", maxPrice: "1100000", minArea: "95", maxArea: "180", total: "120", available: "46", bedFrom: "1", bedTo: "3" }),
      villa: unit({ minPrice: "1900000", maxPrice: "2800000", minArea: "320", maxArea: "460", total: "24", available: "9", bedFrom: "4", bedTo: "6" }),
    },
    payments: ["cash", "bank"],
    features: ["pool", "gym", "security", "parking"],
    adNumber: "AD-100245",
    wafiNumber: "WF-55120",
  }),
  make("palm", "approved", 6, {
    name: "Palm Gardens Villas",
    companyType: "broker",
    types: ["villa"],
    status: "ready",
    region: "Makkah",
    city: "Jeddah",
    district: "Al Rawdah",
    lat: 21.5433,
    lng: 39.1728,
    units: {
      villa: unit({ minPrice: "2200000", maxPrice: "3400000", minArea: "380", maxArea: "520", total: "36", available: "14", bedFrom: "5", bedTo: "7" }),
    },
    payments: ["cash", "bank"],
    features: ["garden", "pool", "kids", "smart", "security"],
    adNumber: "AD-100871",
  }),
  make("plots", "approved", 14, {
    name: "Desert Bloom Plots",
    companyType: "developer",
    types: ["land"],
    status: "ready",
    region: "Riyadh",
    city: "Diriyah",
    district: "Al Bujairi",
    lat: 24.7336,
    lng: 46.5753,
    units: {
      land: unit({ minPrice: "450000", maxPrice: "980000", minArea: "400", maxArea: "900", total: "180", available: "95" }),
    },
    payments: ["cash"],
    features: ["security"],
    adNumber: "AD-100992",
  }),
  make("skyline", "review", 1, {
    name: "Skyline Towers",
    companyType: "developer",
    types: ["apartments"],
    status: "under",
    region: "Eastern Province",
    city: "Dammam",
    district: "Al Faisaliyah",
    lat: 26.4207,
    lng: 50.0888,
    units: {
      apartments: unit({ minPrice: "520000", maxPrice: "890000", minArea: "85", maxArea: "160", total: "210", available: "170", bedFrom: "1", bedTo: "3" }),
    },
    payments: ["bank"],
    features: ["elevator", "gym", "parking", "security"],
    adNumber: "AD-101310",
    wafiNumber: "WF-56002",
  }),
  make("green", "review", 3, {
    name: "Green Valley Townhouses",
    companyType: "broker",
    types: ["townhouse"],
    status: "soon",
    region: "Riyadh",
    city: "Riyadh",
    district: "Hittin",
    lat: 24.7747,
    lng: 46.6233,
    units: {
      townhouse: unit({ minPrice: "1300000", maxPrice: "1750000", minArea: "210", maxArea: "280", total: "60", available: "60", bedFrom: "3", bedTo: "4" }),
    },
    payments: ["cash", "bank"],
    features: ["garden", "kids", "security"],
    adNumber: "AD-101455",
    wafiNumber: "WF-56230",
  }),
];
