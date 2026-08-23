export const siteConfig = {
  name: "Micah Lounge",
  launchMode: "prototype" as const,
  location: {
    status: "pending" as const,
    label: "Venue location to be confirmed",
    city: "",
    country: "",
    address: "",
    mapUrl: "",
  },
  tagline: "Your night, elevated.",
  description:
    "A bold, mobile-first lounge experience built around music, tables, celebrations and a weekly reason to come back.",
  contact: {
    whatsapp: "",
    phone: "",
    email: "",
  },
  openingHours: [] as string[],
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  verifiedAt: null as string | null,
} as const;

export type ThemeNightStatus = "confirmed" | "concept";
export type ThemeNightAccent = "rose" | "violet" | "cyan" | "gold";

export type ThemeNight = {
  id: string;
  day: string;
  title: string;
  kicker: string;
  detail: string;
  cta: string;
  accent: ThemeNightAccent;
  status: ThemeNightStatus;
};

// Publish real events here only after Micah Lounge confirms the details.
export const confirmedThemeNights: ThemeNight[] = [];

// Prototype concepts only. These show how the advertising board works and must
// never be represented by the website or concierge as confirmed Micah Lounge events.
export const conceptThemeNights: ThemeNight[] = [
  {
    id: "concept-wednesday",
    day: "Wednesday",
    title: "Ladies Night",
    kicker: "Concept slot",
    detail: "A polished midweek social night with a strong visual campaign and a rotating weekly offer.",
    cta: "Ask about this concept",
    accent: "rose",
    status: "concept",
  },
  {
    id: "concept-thursday",
    day: "Thursday",
    title: "R&B Rewind",
    kicker: "Concept slot",
    detail: "90s, 2000s and new-school R&B presented as a distinctive midweek music identity.",
    cta: "Ask about this concept",
    accent: "violet",
    status: "concept",
  },
  {
    id: "concept-friday",
    day: "Friday",
    title: "Afrobeats × Amapiano",
    kicker: "Concept slot",
    detail: "A high-energy Friday campaign built around Afrobeats, Amapiano and strong visual promotion.",
    cta: "Ask about this concept",
    accent: "cyan",
    status: "concept",
  },
  {
    id: "concept-saturday",
    day: "Saturday",
    title: "Micah Signature",
    kicker: "Concept slot",
    detail: "A flexible flagship Saturday concept for open-format music, guest moments and headline campaigns.",
    cta: "Ask about this concept",
    accent: "gold",
    status: "concept",
  },
];

export const publishedThemeNights =
  confirmedThemeNights.length > 0 ? confirmedThemeNights : conceptThemeNights;

export const boardMessages =
  confirmedThemeNights.length > 0
    ? [
        "THIS WEEK AT MICAH • LIVE PROGRAMME",
        "MUSIC • TABLES • CELEBRATIONS • WEEKLY EVENTS",
        "ASK MICAH CONCIERGE BEFORE YOU ARRIVE",
      ]
    : [
        "PROTOTYPE PROGRAMME • FOR OWNER APPROVAL",
        "WEEKLY EVENT BOARD • BUILT TO CHANGE IN SECONDS",
        "VENUE DETAILS • PUBLISHED ONLY AFTER CONFIRMATION",
      ];

export const venueContentStatus = {
  locationConfirmed: siteConfig.location.status === "confirmed",
  contactConfirmed: Boolean(siteConfig.contact.whatsapp || siteConfig.contact.phone),
  hoursConfirmed: siteConfig.openingHours.length > 0,
  programmeConfirmed: confirmedThemeNights.length > 0,
} as const;
