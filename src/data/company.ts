/**
 * Single source of truth for every fact rendered on the site.
 *
 * Rule from the blueprint (§12): no number ships without a source. Anything
 * still unconfirmed is marked `verify: true` and must be checked with NFE
 * before launch.
 *
 * This module is also the intended input for the Phase 3 capability-statement
 * PDF, so values stay raw and display formatting lives in `fmt`.
 */

export const identity = {
  legalName: "North Fork Enterprises, LLC",
  shortName: "North Fork Enterprises",
  initials: "NFE",
  founded: 2012,
  tagline: "Construction Supporting Excellence",
  positioning:
    "A federally certified, $20M-bondable heavy civil sub with Exceptional federal past-performance ratings, built in Idaho's Silver Valley.",
  hq: {
    street: "206 N. Division Street",
    city: "Pinehurst",
    state: "ID",
    zip: "83850",
    region: "Silver Valley",
    // verify: federal records list 108 N Division St, Ste 102
    verify: true,
  },
  phone: "(208) 682-1425",
  phoneHref: "tel:+12086821425",
  email: "hr@nfenterprises.co",
  hours: "Mon–Fri 7:00 AM – 5:00 PM",
  naics: "237310",
  naicsLabel: "Highway, Street & Bridge Construction",
  owner: "Jennifer Oertli",
} as const;

export const identifiers = [
  { label: "UEI", value: "D4WKJD1YS1H3" },
  { label: "CAGE", value: "7Q5V2" },
  { label: "DUNS", value: "080319995" },
  { label: "NAICS", value: "237310" },
] as const;

export const explosivesLicense = {
  label: "Federal Explosives License",
  value: "9-ID-079-33-4E-00496",
} as const;

export const licenses = [
  { state: "ID", label: "Idaho Public Works", number: "052054" },
  { state: "WA", label: "Washington", number: "CCNORTHFE791DJ" },
  { state: "OR", label: "Oregon", number: "237618" },
  { state: "NM", label: "New Mexico", number: "414523" },
] as const;

export const bonding = {
  perProject: 20_000_000,
  aggregate: 50_000_000,
} as const;

/** §9.6 — each badge explains what it means for the estimator's bid. */
export const certifications = [
  {
    id: "dbe",
    abbr: "DBE",
    name: "Disadvantaged Business Enterprise",
    detail: "ID · WA · OR",
    bidMeaning:
      "Counts toward federal-aid DBE participation goals in Idaho, Washington and Oregon.",
  },
  {
    id: "wosb",
    abbr: "WOSB",
    name: "Woman-Owned Small Business",
    detail: "Federal",
    bidMeaning:
      "Eligible for federal WOSB set-aside contracts and counts toward small-business subcontracting plans.",
  },
  {
    id: "edwosb",
    abbr: "EDWOSB",
    name: "Economically Disadvantaged Woman-Owned Small Business",
    detail: "Federal",
    bidMeaning:
      "Eligible for EDWOSB set-asides — the narrower federal category inside WOSB.",
  },
  {
    id: "hubzone",
    abbr: "HUBZone",
    name: "Historically Underutilized Business Zone",
    detail: "ID-01",
    bidMeaning:
      "Eligible for HUBZone set-asides and the 10% federal price-evaluation preference.",
  },
  {
    id: "bonded",
    abbr: "Bonded",
    name: "Surety bonding capacity",
    detail: "$20M / $50M",
    bidMeaning:
      "$20,000,000 single-project and $50,000,000 aggregate bonding capacity.",
  },
] as const;

/** §8.3 — six sector cards. */
export const sectors = [
  {
    id: "bridges",
    title: "Bridges",
    blurb:
      "Superstructure replacement, abutments, and timber-trestle removal in remote terrain.",
  },
  {
    id: "roads",
    title: "Roads & Highways",
    blurb:
      "Full-depth reclamation, grading, surfacing, ADA ramps, curb, gutter and sidewalk.",
  },
  {
    id: "underground",
    title: "Underground Utilities",
    blurb:
      "Deep gravity sewer, storm, water main and services — trenched and shored.",
  },
  {
    id: "excavation",
    title: "Excavation & Blasting",
    blurb:
      "Mass excavation, rock work, and licensed drill-and-shoot under a federal explosives license.",
  },
  {
    id: "concrete",
    title: "Concrete & Structures",
    blurb:
      "Retaining walls, structures, flatwork, and cast-in-place concrete for civil work.",
  },
  {
    id: "federal",
    title: "Federal Contracting",
    blurb:
      "Prime and sub on USDA Forest Service and federal-aid work, with Exceptional CPARS ratings.",
  },
] as const;

/**
 * §9.5 — every counter carries the owner/agency it came from, because
 * verifiability is the brand.
 */
export const stats = [
  {
    id: "bond-project",
    value: 20,
    prefix: "$",
    suffix: "M",
    label: "Per-project bonding",
    source: "Surety program",
  },
  {
    id: "bond-aggregate",
    value: 50,
    prefix: "$",
    suffix: "M",
    label: "Aggregate bonding",
    source: "Surety program",
  },
  {
    id: "sewer-lf",
    value: 4400,
    suffix: "+ LF",
    label: "Deep gravity sewer main",
    source: "City of Hayden — Ramsey Rd",
  },
  {
    id: "water-lf",
    value: 3000,
    suffix: "+ LF",
    label: "Water main installed",
    source: "City of Liberty Lake, WA",
  },
  {
    id: "culverts",
    value: 75,
    suffix: "+",
    label: "Culvert crossings, Hwy 12",
    source: "ITD — Lochsa US-12, sub to M.A. DeAtley",
  },
  {
    id: "tribal-housing",
    value: 10,
    prefix: "$",
    suffix: "M",
    label: "Tribal housing program",
    source: "Coeur d'Alene Tribe",
  },
  {
    id: "lanes",
    value: 5,
    label: "Lanes of roadway replaced",
    source: "Sullivan Road — City of Spokane Valley",
  },
  {
    id: "dbe-states",
    value: 3,
    label: "State DBE certifications",
    source: "ID · WA · OR unified certification programs",
  },
] as const;

/** Featured three for the homepage; the full twelve land on /projects later. */
export const featuredProjects = [
  {
    slug: "i90-cda-river-bridges",
    name: "I-90 CDA River Bridges",
    owner: "Idaho Transportation Dept.",
    prime: "Sub to Max Kuney Co.",
    sector: "Bridges",
    stat: "Excavation support, EB & WB spans",
    photo: "featured-i90",
    alt: "Excavator being lifted by crane onto a bridge deck with North Fork Enterprises branding visible.",
  },
  {
    slug: "ramsey-rd",
    name: "Ramsey Road",
    owner: "City of Hayden, ID",
    prime: null,
    sector: "Underground Utilities",
    stat: "4,400+ LF deep gravity sewer main",
    photo: "featured-ramsey",
    alt: "Excavator working in a wet, churned-up utility excavation site.",
  },
  {
    slug: "willow-creek-bridge",
    name: "Willow Creek Bridge",
    owner: "USDA Forest Service — Sawtooth NF",
    prime: null,
    sector: "Bridges",
    stat: "New steel superstructure, remote site",
    photo: "featured-willow-creek",
    alt: "Galvanized steel bridge deck panels being set in a snowy forest canyon.",
  },
] as const;

/** §9.7 — verbatim from the USDA FS evaluation. Permission to expand pending. */
export const commendations = [
  {
    id: "quality",
    category: "Quality",
    rating: "Exceptional",
    agency: "USDA Forest Service",
    pullQuote: "The rock placement around the culverts was a work of art.",
    fullQuote:
      "The contractor took special care to provide outstanding craftsmanship. The rock placement around the culverts was a work of art. They transformed a terrible road full of boulders and washouts by creating a product that exactly resembled the original road before the damage.",
    attribution: "Karen Ruklic, Contract Specialist",
  },
  {
    id: "management",
    category: "Management",
    rating: "Exceptional",
    agency: "USDA Forest Service",
    pullQuote:
      "In 17 years, I have never seen a contractor put in this much effort without a single complaint.",
    fullQuote:
      "In 17 years, I have never seen a contractor put in this much effort without a single complaint. The contractor evaluated their work after the first winter and ensured that everything continued to meet specifications. Due to the historic nature of the road, and the type of recreation in the area, the road was kept open to the public during complex portions of the project.",
    attribution: "Karen Ruklic, Contract Specialist",
  },
] as const;

export const openRoles = [
  "Equipment Operators",
  "Concrete Foreman",
  "General / Concrete Laborers",
  "Pipe Layers",
] as const;

export const benefits = [
  "Paid medical, dental, vision & life",
  "401(k) company match",
  "Paid holidays & vacation",
  "Prevailing wage across the PNW",
] as const;

export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Bid Room", href: "#bid-room" },
  { label: "Safety", href: "#safety" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
] as const;

/** Shared number formatting so the site and the future PDF agree. */
export const fmt = {
  int: (n: number) => n.toLocaleString("en-US"),
  money: (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }),
  stat: (s: { value: number; prefix?: string; suffix?: string }) =>
    `${s.prefix ?? ""}${s.value.toLocaleString("en-US")}${s.suffix ?? ""}`,
} as const;
