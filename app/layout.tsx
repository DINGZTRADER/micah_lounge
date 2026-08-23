import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Micah Lounge | Kampala Nightlife",
  description:
    "Micah Lounge — a nightlife destination for music, food, drinks, celebrations and weekly theme nights.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
