export const siteConfig = {
  name: "Micah Lounge",
  city: "Kampala",
  country: "Uganda",
  tagline: "Your night, elevated.",
  description:
    "A nightlife destination built around music, food, drinks, celebration and memorable theme nights.",
  contact: {
    whatsapp: "",
    phone: "",
    address: "",
    mapUrl: "",
  },
} as const;

export type ThemeNight = {
  day: string;
  title: string;
  kicker: string;
  detail: string;
  cta: string;
  active: boolean;
};

export const themeNights: ThemeNight[] = [];

export const boardMessages = [
  "THEME NIGHTS • MUSIC • FOOD • DRINKS • CELEBRATION",
  "THIS WEEK AT MICAH — PROGRAMME UPDATES APPEAR HERE",
  "ASK MICAH CONCIERGE ABOUT TABLES, EVENTS & THE WEEKLY PROGRAMME",
] as const;
