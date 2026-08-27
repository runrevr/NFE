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

/**
 * Sector and owner-type facets for the /projects filter UI.
 * Sector ids match `sectors` above where they overlap.
 */
export const projectSectors = [
  "Bridges",
  "Roads & Highways",
  "Underground Utilities",
  "Trails & Pedestrian",
  "Federal",
] as const;

export const ownerTypes = ["Federal", "State", "Municipal", "Tribal"] as const;

export type ProjectSector = (typeof projectSectors)[number];
export type OwnerType = (typeof ownerTypes)[number];

/**
 * All twelve projects. Quantities are as published on the current site and in
 * federal records; `verify: true` marks anything to confirm with NFE before
 * launch. `coords` are approximate job locations for the /projects map.
 */
export const projects = [
  {
    slug: "ramsey-rd",
    name: "Ramsey Road",
    owner: "City of Hayden, ID",
    ownerType: "Municipal",
    prime: null,
    sector: "Underground Utilities",
    location: "Hayden, ID",
    coords: [-116.7866, 47.766],
    year: null,
    value: null,
    headline: "4,400+ LF deep gravity sewer main",
    scope:
      "Installed over 4,400 linear feet of deep gravity sewer main and 5,500 linear feet of water main for the City of Hayden — shored, bedded, and backfilled to municipal standard.",
    quantities: [
      { label: "Deep gravity sewer main", value: "4,400+ LF" },
      { label: "Water main", value: "5,500 LF" },
    ],
    photo: "featured-ramsey",
    alt: "Excavator working in a wet, churned-up utility excavation site.",
    planSheet: "ramsey",
    featured: true,
    verify: true,
  },
  {
    slug: "lochsa-us-12",
    name: "Lochsa US-12",
    owner: "Idaho Transportation Dept.",
    ownerType: "State",
    prime: "M.A. DeAtley",
    sector: "Roads & Highways",
    location: "Lochsa River corridor, US-12, ID",
    coords: [-115.4, 46.42],
    year: null,
    value: null,
    headline: "75+ culvert crossings across Highway 12",
    scope:
      "Set more than 75 culvert crossings along the US-12 Lochsa corridor as a subcontractor to M.A. DeAtley, working a live highway through mountain terrain.",
    quantities: [{ label: "Culvert crossings", value: "75+" }],
    photo: null,
    alt: null,
    planSheet: "culverts",
    featured: false,
    verify: true,
  },
  {
    slug: "wisconsin-st",
    name: "Wisconsin Street",
    owner: "Idaho Transportation Dept.",
    ownerType: "State",
    prime: null,
    sector: "Roads & Highways",
    location: "Priest River, ID",
    coords: [-116.9113, 48.1802],
    year: null,
    value: null,
    headline: "US-2 intersection improvements",
    scope:
      "Road improvements at the intersection of US-2 and Wisconsin Street in Priest River for the Idaho Transportation Department.",
    quantities: [],
    photo: null,
    alt: null,
    planSheet: null,
    featured: false,
    verify: true,
  },
  {
    slug: "i90-cda-river-bridges",
    name: "I-90 CDA River Bridges",
    owner: "Idaho Transportation Dept.",
    ownerType: "State",
    prime: "Max Kuney Co.",
    sector: "Bridges",
    location: "Coeur d'Alene River, I-90, ID",
    coords: [-116.5872, 47.5541],
    year: null,
    value: null,
    headline: "Excavation support, eastbound & westbound spans",
    scope:
      "Excavation support for the replacement of the eastbound and westbound I-90 bridges over the Coeur d'Alene River, working as a subcontractor to Max Kuney Company.",
    quantities: [],
    photo: "featured-i90",
    alt: "Excavator being lifted by crane onto a bridge deck with North Fork Enterprises branding visible.",
    planSheet: null,
    featured: true,
    verify: true,
  },
  {
    slug: "mcghee-rd-pedestrian",
    name: "McGhee Road Pedestrian Improvements",
    owner: "Idaho Transportation Dept.",
    ownerType: "State",
    prime: null,
    sector: "Trails & Pedestrian",
    location: "Ponderay, ID",
    coords: [-116.5333, 48.3016],
    year: null,
    value: null,
    headline: "Trail construction, Ponderay",
    scope:
      "Pedestrian trail construction along McGhee Road in Ponderay for the Idaho Transportation Department.",
    quantities: [],
    photo: null,
    alt: null,
    planSheet: null,
    featured: false,
    verify: true,
  },
  {
    slug: "desmet-rd-trail-bridge",
    name: "Desmet Road Trail & Bridge",
    owner: "Coeur d'Alene Tribe",
    ownerType: "Tribal",
    prime: null,
    sector: "Trails & Pedestrian",
    location: "DeSmet, ID",
    coords: [-116.9391, 47.1213],
    year: null,
    value: null,
    headline: "Trail, sidewalk & pedestrian bridge",
    scope:
      "Trail, sidewalk, and pedestrian bridge construction for the Coeur d'Alene Tribe.",
    quantities: [],
    photo: null,
    alt: null,
    planSheet: null,
    featured: false,
    verify: true,
  },
  {
    slug: "cda-tribal-housing",
    name: "CDA Tribal Housing",
    owner: "Coeur d'Alene Tribe",
    ownerType: "Tribal",
    prime: null,
    sector: "Underground Utilities",
    location: "Coeur d'Alene Reservation, ID",
    coords: [-116.8, 47.22],
    year: null,
    value: 10_000_000,
    headline: "$10M housing & underground utilities program",
    scope:
      "Multiple housing developments and the underground utilities serving them for the Coeur d'Alene Tribe — a $10 million program of work.",
    quantities: [{ label: "Program value", value: "$10M" }],
    photo: "tribal-housing",
    alt: "Completed tribal housing subdivision with new sidewalks, curb, streetlights and young pines.",
    planSheet: null,
    featured: false,
    verify: true,
  },
  {
    slug: "liberty-lake-sewer-water",
    name: "Liberty Lake Sewer & Water",
    owner: "City of Liberty Lake, WA",
    ownerType: "Municipal",
    prime: null,
    sector: "Underground Utilities",
    location: "Liberty Lake, WA",
    coords: [-117.0883, 47.6757],
    year: null,
    value: null,
    headline: "3,000+ LF of water main and services",
    scope:
      "Installation of over 3,000 feet of water main and water services for the City of Liberty Lake, Washington.",
    quantities: [{ label: "Water main", value: "3,000+ LF" }],
    photo: null,
    alt: null,
    planSheet: null,
    featured: false,
    verify: true,
  },
  {
    slug: "willow-creek-bridge",
    name: "Willow Creek Bridge",
    owner: "USDA Forest Service",
    ownerType: "Federal",
    prime: null,
    sector: "Bridges",
    location: "Sawtooth National Forest, ID",
    coords: [-114.9, 43.68],
    year: 2022,
    value: null,
    headline: "New steel superstructure, remote site",
    scope:
      "Removed an existing timber bridge and its abutments and installed a new steel superstructure at a remote site in the Sawtooth National Forest.",
    quantities: [
      { label: "Span", value: "60'-0\"" },
      { label: "Width", value: "24'-0\"" },
      { label: "Vehicle loading", value: "HL-93" },
    ],
    photo: "featured-willow-creek",
    alt: "Galvanized steel bridge deck panels being set in a snowy forest canyon.",
    planSheet: "bridge-swap",
    featured: true,
    // Span/width/loading read off the Big R / Contech nameplate photo.
    verify: true,
  },
  {
    slug: "potlatch-road-bridge",
    name: "Potlatch Road Bridge",
    owner: null,
    ownerType: "Municipal",
    prime: null,
    sector: "Bridges",
    location: "Potlatch, ID",
    coords: [-116.8935, 46.9224],
    year: null,
    value: null,
    headline: "Timber trestle replaced with a single span",
    scope:
      "Replaced a wood timber trestle with a larger single-span bridge structure.",
    quantities: [],
    photo: null,
    alt: null,
    planSheet: null,
    featured: false,
    // The current site prints the Willow Creek description under this project.
    // Confirm these are two distinct jobs and who the owner is.
    verify: true,
  },
  {
    slug: "sullivan-road",
    name: "Sullivan Road",
    owner: "City of Spokane Valley, WA",
    ownerType: "Municipal",
    prime: null,
    sector: "Roads & Highways",
    location: "Spokane Valley, WA",
    coords: [-117.1878, 47.6588],
    year: null,
    value: 4_000_000,
    headline: "$4M arterial rebuild — 5 lanes replaced",
    scope:
      "Storm structure installation, new ADA ramps, curb and gutter, sidewalk, ITS infrastructure, traffic signal revisions, and replacement of five lanes of roadway.",
    quantities: [
      { label: "Contract value", value: "$4M" },
      { label: "Lanes replaced", value: "5" },
    ],
    photo: "sullivan",
    alt: "Sullivan Road arterial widening with delineators, roller and excavator alongside live traffic.",
    planSheet: "exploded-roadway",
    featured: false,
    // Current site says "City of Spokane"; the testimonial is from Spokane Valley.
    verify: true,
  },
  {
    slug: "usfs-road-reconstruction",
    name: "USFS Road Reconstruction",
    owner: "USDA Forest Service",
    ownerType: "Federal",
    prime: "Prime contractor",
    sector: "Federal",
    location: "USDA Forest Service, ID",
    coords: [-115.8, 46.9],
    year: null,
    value: 769_000,
    headline: "Rated Exceptional for Quality and Management",
    scope:
      "Stewardship contract covering culvert, surfacing and drainage improvements, full-depth reclamation, and storm-damage repair. The road was kept open to the public through the most complex phases. Extended a second season for fire and snow conditions, with the service value growing to roughly $769K through added scope.",
    quantities: [
      { label: "Service value", value: "~$769K" },
      { label: "Quality rating", value: "Exceptional" },
      { label: "Management rating", value: "Exceptional" },
    ],
    photo: null,
    alt: null,
    planSheet: null,
    featured: false,
    commendation: true,
    verify: true,
  },
] as const;

/** The three the homepage leads with. */
export const featuredProjects = projects.filter((p) => p.featured);

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
  { label: "Projects", href: "/projects" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Bid Room", href: "/bid-room" },
  { label: "Safety", href: "/safety" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Public verification links for the Bid Room. Radical transparency is the
 * point: an estimator can confirm every claim without emailing anyone.
 */
export const verificationLinks = [
  {
    label: "SAM.gov entity record",
    href: "https://sam.gov/search/?q=D4WKJD1YS1H3",
    note: "Federal registration, UEI D4WKJD1YS1H3",
  },
  {
    label: "Idaho UCP DBE directory",
    href: "https://itd.idaho.gov/civil-rights/",
    note: "Idaho Transportation Department civil rights",
  },
  {
    label: "Washington UCP DBE directory",
    href: "https://omwbe.wa.gov/certification/directory-certified-firms",
    note: "Office of Minority & Women's Business Enterprises",
  },
  {
    label: "Oregon UCP DBE directory",
    href: "https://www.oregon.gov/coba/Pages/ocr-certification.aspx",
    note: "Certification Office for Business Inclusion & Diversity",
  },
] as const;

/**
 * One-field request flows in the Bid Room. Each pre-tags a subject line so
 * NFE can route it without reading the body.
 */
export const bidRequests = [
  { id: "bonding", label: "Bonding letter", subject: "Bonding letter request" },
  {
    id: "insurance",
    label: "Certificate of insurance",
    subject: "Insurance certificate request",
  },
  { id: "w9", label: "W-9", subject: "W-9 request" },
  { id: "references", label: "References", subject: "Reference request" },
] as const;

/** About page. Team roster is a placeholder until NFE supplies names/photos. */
export const about = {
  founded: 2012,
  ownerName: "Jennifer Oertli",
  ownerEducation: "University of Montana",
  story: [
    "North Fork Enterprises was founded in 2012 in Pinehurst, Idaho — a Silver Valley town of about 1,600 people, an hour east of Coeur d'Alene on I-90.",
    "It is a woman-owned heavy civil contractor that self-performs bridge, roadway, underground utility, excavation, and blasting work across Idaho, Washington, and Oregon. The company holds federal DBE, WOSB, EDWOSB, and HUBZone certifications and carries $20,000,000 per-project bonding capacity.",
    "The work runs from municipal water main in Liberty Lake to a steel bridge superstructure set at a remote site in the Sawtooth National Forest. On a USDA Forest Service stewardship contract, the company earned Exceptional ratings for both Quality and Management.",
  ],
  values: ["Integrity", "Honesty", "Transparency", "Trust"],
  memberships: ["Inland Northwest AGC", "Idaho AGC"],
  // Names, roles and photos still to come from NFE.
  team: [] as ReadonlyArray<{ name: string; role: string; photo?: string }>,
} as const;

/** Safety page. EMR is the number estimators look for — still outstanding. */
export const safety = {
  emr: null as number | null,
  emrYear: null as number | null,
  program: [
    "Safety is the first of the three values printed on the jobsite banner, ahead of Excellence and Integrity.",
    "Crews work prevailing-wage public projects across the Pacific Northwest, much of it alongside live traffic and active utilities. Site-specific planning, competent-person trench oversight, and licensed blasting operations under a federal explosives license are part of how the work is run.",
  ],
  caseStudy: {
    title: "Keeping a public road open through full-depth reclamation",
    body: "On the USDA Forest Service stewardship contract, the road carried recreational traffic throughout construction. Rather than close it, crews phased the work and accommodated the public through full-depth reclamation — and the contracting officer rated Management Exceptional, noting 17 years without seeing that level of effort and no complaints.",
  },
} as const;

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
