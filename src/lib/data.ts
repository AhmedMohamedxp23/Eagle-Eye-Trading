export const NAV_PAGES = [
  { id: "home", href: "/", label: "HOME" },
  { id: "about", href: "/about", label: "ABOUT US" },
  { id: "services", href: "/services", label: "SERVICES" },
  { id: "products", href: "/products", label: "PRODUCTS" },
  { id: "contact", href: "/contact", label: "CONTACT" },
];

export const SERVICES = [
  {
    num: "01",
    title: "Consultation",
    stage: "PRE-TENDER",
    short: "Feasibility, standards review and scoping ahead of tender.",
    long: "Feasibility studies and scoping before the tender is issued.",
    img: "design-review.jpg",
  },
  {
    num: "02",
    title: "Design & Engineering",
    stage: "IN-KINGDOM",
    short: "In-Kingdom engineers producing designs to industry best practice.",
    long: "In-Kingdom engineers, designed to best practice from day one.",
    img: "cad-engineering.jpg",
  },
  {
    num: "03",
    title: "Installation",
    stage: "SITE WORKS",
    short: "Supervised site works across electrical, ICT and life-safety scopes.",
    long: "Supervised site works, electrical through life-safety.",
    img: "cable-containment.jpg",
  },
  {
    num: "04",
    title: "System Integration",
    stage: "360° TURNKEY",
    short: "Diverse technologies unified into one reliable operating picture.",
    long: "Every system, unified into one operating picture.",
    img: "network-server-room.jpg",
  },
  {
    num: "05",
    title: "Testing & Commissioning",
    stage: "HANDOVER",
    short: "Documented verification and witness testing at handover.",
    long: "Witness-tested, documented, and handed over.",
    img: "commissioning.jpg",
  },
  {
    num: "06",
    title: "Operation & Maintenance",
    stage: "LIFETIME",
    short: "Preventive and corrective programmes with response SLAs.",
    long: "Preventive and corrective maintenance, on defined SLAs.",
    img: "panel-testing.jpg",
  },
];

export const DOMAINS = [
  {
    label: "ICT",
    title: "Information Communication & Technology",
    intro: "The networks and IT estate that keep the business running.",
    items: [
      { t: "Communication & Data Network", b: "Structured cabling and active infrastructure." },
      { t: "IT Equipment & Tools", b: "Workstations, servers and storage." },
      { t: "Security & Safety Systems", b: "ICT security layered over the network." },
    ],
    img1: "data-center-aisle.jpg",
    img2: "server-cabinet-row.jpg",
  },
  {
    label: "FIRE & LIFE SAFETY",
    title: "Fire Alarm Systems (FAS)",
    intro: "Detection and suppression that protects lives and property.",
    items: [
      { t: "Fire Detection Systems", b: "Smoke, heat and flame sensing with acoustic evacuation." },
      { t: "Fire Extinguishing", b: "Sprinkler and water mist suppression." },
      { t: "Conventional Detection", b: "Sensing suited to residential and apartment buildings." },
    ],
    img1: "domain-fire-1.jpg",
    img2: "domain-fire-2.jpg",
  },
  {
    label: "LIGHTING",
    title: "Lighting Fixtures",
    intro: "LED and HID lighting for safer, better-lit urban environments.",
    items: [
      { t: "Street Poles", b: "Durable poles for walkways and roadways." },
      { t: "General Lightings", b: "Recessed, pendant and ceiling fixtures." },
      { t: "Searching Lights", b: "Spotlights and floodlights for demanding sites." },
    ],
    img1: "street-lighting.jpg",
    img2: "interior-lighting.jpg",
  },
  {
    label: "SECURITY",
    title: "Electronic Security",
    intro: "PSIM, video and perimeter detection as one integrated system.",
    items: [
      { t: "Command & Control", b: "Alarms, video and access in one operator view." },
      { t: "Perimeter Protection", b: "Fibre-optic fence sensing, LiDAR and video analytics." },
      { t: "Public Address", b: "Voice evacuation across large facilities." },
    ],
    img1: "products/psim-control-room.jpg",
    img2: "products/fofs.jpg",
  },
  {
    label: "AI",
    title: "Artificial Intelligence",
    intro: "Machine intelligence applied to the systems we already deliver.",
    items: [
      { t: "Banking", b: "Fraud detection and fast credit scoring." },
      { t: "Retail", b: "Personalised recommendations, virtual shopping." },
      { t: "Smart City", b: "Across governance, mobility, healthcare and utilities." },
    ],
    img1: "robotic-arm-automation.jpg",
    img2: "smart-city-camera.jpg",
  },
];

export const PARTNERS = [
  ["abb", "ABB"],
  ["schneider-electric", "Schneider Electric"],
  ["honeywell", "Honeywell"],
  ["legrand", "Legrand"],
  ["osram", "OSRAM"],
  ["axis", "Axis Communications"],
  ["kidde", "Kidde"],
  ["tyco", "Tyco Security Products"],
  ["mobotix", "Mobotix"],
  ["lenel", "Lenel"],
  ["gent", "Gent by Honeywell"],
  ["edwards", "Edwards"],
  ["raytec", "Raytec"],
  ["liper", "Liper"],
  ["mefc", "MEFC"],
  ["optasense", "OptaSense"],
  ["fiber-sensys", "Fiber SenSys"],
  ["boss-audio", "BOSS Audio Systems"],
  ["amg", "AMG"],
  ["promise", "Promise Technology"],
  ["cohu-costar", "Cohu | HD Costar"],
  ["nedap", "Nedap"],
  ["hanwha-samsung", "Hanwha / Samsung"],
  ["cias", "CIAS"],
] as const;

export const CLIENTS = [
  { img: "client-ksa-emblem.jpg", alt: "Kingdom of Saudi Arabia" },
  { img: "client-moh.jpg", alt: "Ministry of Health" },
  { img: "client-sec.jpg", alt: "Saudi Electricity Company" },
  { img: "client-royal-guard.jpg", alt: "Royal Guard" },
  { img: "client-rsaf.jpg", alt: "Royal Saudi Air Force" },
  { img: "client-mmra.png", alt: "Ministry of Municipal Rural Affairs & Housing" },
  { img: "client-aramco.png", alt: "Saudi Aramco" },
  { img: "client-kafd.png", alt: "King Abdullah Financial District" },
  { img: "client-sabic.png", alt: "SABIC" },
];

export type FamilyId = "security" | "ict" | "ai" | "fas" | "lighting";

export const FAMILIES: {
  id: FamilyId;
  label: string;
  title: string;
  intro: string;
}[] = [
  {
    id: "security",
    label: "SECURITY",
    title: "Security",
    intro: "Command, detection and assessment — one integrated platform.",
  },
  {
    id: "ict",
    label: "ICT",
    title: "Information & Communication Technology",
    intro: "Network infrastructure, the IT estate, and the security layer over both.",
  },
  {
    id: "ai",
    label: "AI",
    title: "Artificial Intelligence",
    intro: "Machine intelligence applied to the systems we already deliver.",
  },
  {
    id: "fas",
    label: "FIRE ALARM SYSTEM",
    title: "Fire Alarm Systems",
    intro: "Detection, notification and extinguishing — built for assurance.",
  },
  {
    id: "lighting",
    label: "LIGHTING FIXTURES",
    title: "Lighting Fixtures",
    intro: "LED and HID fixtures for visibility and safety, indoors and out.",
  },
];

// Each row: [code, title, body, productImage?, assetImage?]
// productImage resolves under assets/products/, assetImage under assets/ directly.
type ProductRow = [string, string, string, string, string];

const SECURITY_PRODUCTS: ProductRow[] = [
  ["PSIM", "Physical Security Information Management", "One operator view that correlates alarms, video and access events across a whole estate.", "psim-control-room.jpg", ""],
  ["ISS", "Integrated Security System", "Access control, intrusion and video unified behind a single set of rules and workflows.", "iss.jpg", ""],
  ["VASS", "Video Assessment & Surveillance System", "Control-room grade surveillance with assessment workflows for operators.", "vass.jpg", ""],
  ["SL", "Security Lighting", "Illumination engineered for camera performance and deterrence along perimeters.", "security-lighting.jpg", ""],
  ["VCA", "Video Content Analysis", "Automated classification and tracking of vehicles, people and objects in live video.", "video-content-analysis.jpg", ""],
  ["FOFS", "Fiber Optic Fence Sensor", "Perimeter fence sensing that locates disturbance events along the fence line.", "fofs.jpg", ""],
  ["IDAS", "Intrusion Detection & Assessment System", "Zoned detection with immediate assessment before an operator escalates.", "idas.jpg", ""],
  ["LiDAR", "Light Detection & Ranging", "Volumetric detection and tracking independent of ambient light conditions.", "motion-sensor-detail.jpg", ""],
  ["PAGA", "PAGA System", "Public address and general alarm racks for voice evacuation across large facilities.", "paga.jpg", ""],
];

const ICT_PRODUCTS: ProductRow[] = [
  ["NET", "Structured Data Network", "Cabling, containment and patching designed per purpose — voice, data and business-critical traffic on one certified plant.", "", "data-network.jpg"],
  ["ACT", "Active Network Equipment", "Switching, routing and wireless sized for the estate, with the resilience the application actually requires.", "active-network-equipment.jpg", ""],
  ["ITE", "IT Equipment & Tools", "Workstations, servers, storage and the software estate that keeps departments running against supply and demand.", "it-workstations.jpg", ""],
  ["SEC", "ICT Security", "As processes digitise, safeguarding data becomes a matter of the utmost importance — security layered over the network, not bolted on.", "", "network-patch-panel.jpg"],
  ["DC", "Data Cabinets & Containment", "Racks, cable management and power distribution built for maintainable growth.", "", "server-blade-detail.jpg"],
  ["CMS", "Commissioning & Certification", "Documented link testing and as-built records handed over with the network.", "multimeter-testing.jpg", ""],
];

const AI_PRODUCTS: ProductRow[] = [
  ["VCA", "Machine Vision & Video Analytics", "Automated classification and tracking of vehicles, people and objects in live video — expert systems applied to the cameras you already own.", "video-content-analysis.jpg", ""],
  ["BNK", "Banking Applications", "AI techniques identify which transactions are likely to be fraudulent and support fast, accurate credit scoring.", "", "handshake.jpg"],
  ["RTL", "Retail Applications", "Virtual shopping capabilities that offer personalised recommendations and discuss purchase options with the consumer.", "", "client-meeting.jpg"],
  ["SPC", "Speech Recognition", "Voice interfaces and transcription where operators need hands free of a keyboard.", "speech-recognition.jpg", ""],
  ["SMC", "Smart City", "Applied across education, governance, buildings, mobility, healthcare and utilities.", "", "smart-city-camera.jpg"],
  ["EXP", "Expert Systems", "Rule and model-driven decision support that learns, reasons and self-corrects.", "", "ai-engineer-servers.jpg"],
];

const FAS_PRODUCTS: ProductRow[] = [
  ["FDS", "Fire Detection Systems", "Sensors automatically detect smoke, heat and flame during the initial stages of a fire; a receiver triggers acoustic devices to urge occupants to evacuate.", "fire-call-point.jpg", ""],
  ["EXT", "Fire Extinguishing", "VS sprinkler equipment reduces water-leakage incidents from head damage without reducing extinguishing performance.", "", "fire-sprinkler-zones.jpg"],
  ["MST", "Water Mist Equipment", "High extinguishing performance from a small volume of water, where water damage is itself a risk.", "water-mist-nozzle.jpg", ""],
  ["CNV", "Conventional Detection", "Sensing and alarm methods suited to individual households, residential blocks and apartment buildings.", "household-detector.jpg", ""],
  ["ADR", "Addressable Systems", "Loop-based detection that reports the device, not just the zone — for facilities where response time matters.", "fire-alarm-strobe.jpg", ""],
  ["PAG", "Voice Evacuation (PAGA)", "Public address and general alarm racks for phased evacuation across large facilities.", "paga.jpg", ""],
];

const LIGHT_PRODUCTS: ProductRow[] = [
  ["STP", "Street Poles", "Durable, reliable poles designed specifically for urban environments, lighting walkways and roadways alike.", "", "street-lighting.jpg"],
  ["GEN", "General Lightings", "Recessed lights, pendant lamps and ceiling fixtures for diverse indoor and outdoor environments, optimising ambiance and function.", "", "interior-lighting.jpg"],
  ["SRC", "Searching Lights", "Spotlights and floodlights built for challenging environments and robust exploration or search operations.", "", "stage-lighting.jpg"],
  ["SL", "Security Lighting", "Illumination engineered for camera performance and deterrence along perimeters.", "security-lighting.jpg", ""],
  ["HID", "HID Lamps", "High-intensity discharge lamps where output per fixture outweighs efficiency.", "industrial-pendant-lights.jpg", ""],
  ["LED", "LED Fixtures", "Premium LED solutions selected for lumen maintenance and colour consistency over the fixture's life.", "led-fixtures.jpg", ""],
];

const PRODUCTS_BY_FAMILY: Record<FamilyId, ProductRow[]> = {
  security: SECURITY_PRODUCTS,
  ict: ICT_PRODUCTS,
  ai: AI_PRODUCTS,
  fas: FAS_PRODUCTS,
  lighting: LIGHT_PRODUCTS,
};

export const SCOPES = [
  { title: "Fire Alarm & Detection", hint: "FAS panels, detectors, notification" },
  { title: "Fire Extinguishing", hint: "Sprinkler, water mist" },
  { title: "Electronic Security", hint: "CCTV, access control, intrusion" },
  { title: "Data & Communication Network", hint: "Structured cabling, active gear" },
  { title: "IT Equipment & Tools", hint: "Workstations, servers, licensing" },
  { title: "Lighting Fixtures", hint: "Street poles, general, searchlights" },
];

export const ORG_TYPES = ["Government", "Contractor", "Owner"];

export function getProducts(family: FamilyId) {
  return (PRODUCTS_BY_FAMILY[family] ?? SECURITY_PRODUCTS).map(
    ([code, title, body, productImage, assetImage]) => {
      const src = productImage
        ? `products/${productImage}`
        : assetImage
          ? assetImage
          : "";
      return { code, title, body, img: src, hasImage: !!src };
    }
  );
}
