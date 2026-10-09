import {
  Banknote,
  Baby,
  Building2,
  Car,
  Cpu,
  Dumbbell,
  BadgeCheck,
  LayoutList,
  FileText,
  GraduationCap,
  Hospital,
  Images,
  Landmark,
  MapPin,
  PencilLine,
  Ruler,
  SearchCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrainFront,
  TreePine,
  Trees,
  Waves,
} from "lucide-react";

/** Static options for the Add Project form. Replace the sample lists with API data later. */

export const COMPANY_TYPES = [
  { value: "developer", label: "Developer" },
  { value: "broker", label: "Brokerage Company" },
];

export const PROJECT_TYPES = [
  { value: "villa", label: "Villa" },
  { value: "apartments", label: "Apartments" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
  { value: "other", label: "Other" },
];

export const PROJECT_STATUSES = [
  { value: "under", label: "Under construction", desc: "Building work has started" },
  { value: "ready", label: "Ready", desc: "Units are ready to move in" },
  { value: "soon", label: "Coming soon", desc: "Announced, sales not open yet" },
];

export const DEVELOPER_SOURCES = [
  { value: "registered", label: "Yes, on KeyBayt" },
  { value: "external", label: "No, not on KeyBayt" },
];

export const PAYMENT_OPTIONS = [
  { value: "cash", label: "Cash" },
  { value: "bank", label: "Bank financing" },
];

export const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const PARKING_OPTIONS = [
  { value: "yes", label: "Available" },
  { value: "no", label: "Not available" },
];

export const FURNISHING_OPTIONS = [
  { value: "furnished", label: "Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

/** What a furnished unit includes (optional, shown only when "Furnished" is chosen). */
export const FURNISHED_ITEMS = [
  { value: "ac", label: "Air conditioning" },
  { value: "kitchen", label: "Kitchen appliances" },
  { value: "wardrobes", label: "Wardrobes" },
  { value: "beds", label: "Beds" },
  { value: "sofas", label: "Sofas and seating" },
  { value: "curtains", label: "Curtains" },
  { value: "lighting", label: "Lighting" },
  { value: "washer", label: "Washing machine" },
];

export const WARRANTY_UNITS = [
  { value: "years", label: "Years" },
  { value: "months", label: "Months" },
];

export const FACADES = [
  { value: "n", label: "North" },
  { value: "s", label: "South" },
  { value: "e", label: "East" },
  { value: "w", label: "West" },
  { value: "ne", label: "Northeast" },
  { value: "nw", label: "Northwest" },
  { value: "se", label: "Southeast" },
  { value: "sw", label: "Southwest" },
];

export const FEATURES = [
  { value: "parking", label: "Private parking", icon: Car },
  { value: "pool", label: "Swimming pool", icon: Waves },
  { value: "gym", label: "Gym", icon: Dumbbell },
  { value: "kids", label: "Children's area", icon: Baby },
  { value: "security", label: "Security", icon: ShieldCheck },
  { value: "smart", label: "Smart home", icon: Cpu },
  { value: "garden", label: "Garden", icon: Trees },
  { value: "elevator", label: "Elevator", icon: Building2 },
];

export const NEARBY_PLACES = [
  { value: "mosque", label: "Mosque", icon: Landmark },
  { value: "school", label: "School", icon: GraduationCap },
  { value: "hospital", label: "Hospital", icon: Hospital },
  { value: "mall", label: "Shopping mall", icon: ShoppingBag },
  { value: "park", label: "Park", icon: TreePine },
  { value: "transit", label: "Metro or bus station", icon: TrainFront },
];

export const PROPERTY_AGES = [
  { value: "new", label: "New" },
  { value: "lt1", label: "Less than 1 year" },
  { value: "1to5", label: "1 to 5 years" },
  { value: "gt5", label: "More than 5 years" },
];

/** Placeholder until the verified developers list comes from the API. */
export const DEVELOPER_OPTIONS = [
  { value: "dev-1", label: "Verified Developer 1" },
  { value: "dev-2", label: "Verified Developer 2" },
  { value: "dev-3", label: "Verified Developer 3" },
];

/** Match score weights (add up to 100). */
export const MATCH_WEIGHTS = {
  location: 25,
  price: 25,
  type: 15,
  area: 10,
  rooms: 10,
  features: 10,
  status: 5,
};

export const PROJECT_STEPS = [
  { id: "basic", label: "Basics", hint: "Name and type", icon: FileText },
  { id: "location", label: "Location", hint: "Where it is", icon: MapPin },
  { id: "units", label: "Pricing", hint: "Units and payment", icon: Banknote },
  { id: "specs", label: "Specs", hint: "Property details", icon: Ruler },
  { id: "amenities", label: "Amenities", hint: "Features and nearby", icon: Sparkles },
  { id: "licenses", label: "Licenses", hint: "Legal documents", icon: ShieldCheck },
  { id: "media", label: "Media", hint: "Photos and files", icon: Images },
];

export const EMPTY_UNIT = {
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
};

export const INITIAL_PROJECT_FORM = {
  companyType: "developer",
  name: "",
  description: "",
  devSource: "registered",
  developerId: "",
  devName: "",
  devCr: "",
  authName: "",
  authExpiry: "",
  authFile: null,
  types: [],
  status: "under",
  completion: "",
  region: "",
  city: "",
  district: "",
  address: "",
  lat: null,
  lng: null,
  units: {},
  payments: [],
  cashDownPayment: "",
  cashDiscount: "",
  cashInstallmentMonths: "",
  bankNames: "",
  bankDownPayment: "",
  bankMaxYears: "",
  sakani: "no",
  livingFrom: "",
  livingTo: "",
  floorsFrom: "",
  floorsTo: "",
  buildingAreaFrom: "",
  buildingAreaTo: "",
  landAreaFrom: "",
  landAreaTo: "",
  streetWidthFrom: "",
  streetWidthTo: "",
  age: "",
  facades: [],
  parking: "yes",
  parkingSpacesFrom: "",
  parkingSpacesTo: "",
  furnishing: "unfurnished",
  furnishedItems: [],
  warrantyStructure: "",
  warrantyStructureUnit: "years",
  warrantyOther: "",
  features: [],
  otherAmenities: "",
  nearby: {},
  wafiNumber: "",
  wafiExpiry: "",
  wafiFile: null,
  adNumber: "",
  adExpiry: "",
  adFile: null,
  cover: null,
  photos: [],
  video: "",
  tour: "",
  floorPlans: null,
  brochure: null,
};


/** Top-level tabs of the Projects page. `status` links a tab to saved project status. */
export const PROJECT_TABS = [
  { id: "all", label: "All projects", icon: LayoutList },
  { id: "approved", label: "Approved", icon: BadgeCheck, status: "approved" },
  { id: "review", label: "Submitted for review", icon: SearchCheck, status: "review" },
  { id: "drafts", label: "Drafts", icon: PencilLine, status: "draft" },
];

export const PROJECT_STATUS_BADGES = {
  draft: { label: "Draft", className: "bg-warning-light text-warning" },
  review: { label: "In review", className: "bg-primary-light text-primary" },
  approved: { label: "Approved", className: "bg-success-light text-success" },
};

/** Empty-state copy for each projects tab. */
export const PROJECT_EMPTY_STATES = {
  all: {
    title: "No projects yet",
    description: "Add your first project and it will show up here.",
  },
  approved: {
    title: "No approved projects",
    description: "Projects appear here once the KeyBayt team has approved them.",
  },
  review: {
    title: "Nothing submitted yet",
    description: "Projects you submit for review will appear here while the KeyBayt team checks them.",
  },
  drafts: {
    title: "No drafts yet",
    description: "Projects you save as draft will show up here so you can finish them later.",
  },
};
