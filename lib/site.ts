export const siteConfig = {
  name: "Micah Lounge",
  city: "Kampala",
  country: "Uganda",
  launchMode: "prototype" as const,
  tagline: "Kampala after dark, made easy.",
  description:
    "A bold, mobile-first lounge experience built around music, tables, celebrations and a weekly reason to come back.",
  contact: {
    whatsapp: "",
    phone: "",
    address: "",
    mapUrl: "",
  },
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

// These are prototype concepts, not claims about Micah Lounge's current programme.
// They are informed by current Kampala nightlife patterns and exist so the owner can
// see the advertising board working before supplying the real weekly schedule.
export const conceptThemeNights: ThemeNight[] = [
  {
    id: "concept-wednesday",
    day: "Wednesday",
    title: "Ladies Night",
    kicker: "Concept slot",
    detail: "A polished midweek social night with a strong visual campaign and rotating weekly offer.",
    cta: "Ask about this concept",
    accent: "rose",
    status: "concept",
  },
  {
    id: "concept-thursday",
    day: "Thursday",
    title: "R&B Rewind",
    kicker: "Concept slot",
    detail: "90s, 2000s and new-school R&B designed as a distinctive midweek music identity.",
    cta: "Ask about this concept",
    accent: "violet",
    status: "concept",
  },
  {
    id: "concept-friday",
    day: "Friday",
    title: "Afrobeats × Amapiano",
    kicker: "Concept slot",
    detail: "A high-energy Friday campaign built around the sounds currently driving Kampala lounge culture.",
    cta: "Ask about this concept",
    accent: "cyan",
    status: "concept",
  },
  {
    id: "concept-saturday",
    day: "Saturday",
    title: "Micah Signature",
    kicker: "Concept slot",
    detail: "The flagship Saturday: open-format energy, guest moments and a flexible headline campaign.",
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
        "MICAH CONCIERGE • EVENTS • TABLES • VENUE INFO",
      ];
