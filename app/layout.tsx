import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mica Lounge | Theme Nights & Concierge",
  description:
    "Mica Lounge prototype with weekly theme-night promotion, table planning and a grounded intelligent concierge.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
