import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Micah Lounge | Theme Nights & Concierge",
  description:
    "Micah Lounge prototype with weekly theme-night promotion, table planning and a grounded intelligent concierge.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
