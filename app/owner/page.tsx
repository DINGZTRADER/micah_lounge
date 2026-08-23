import type { Metadata } from "next";

import { OwnerConsole } from "@/components/OwnerConsole";

export const metadata: Metadata = {
  title: "Mica Lounge Owner Console",
  robots: { index: false, follow: false },
};

export default function OwnerPage() {
  return <OwnerConsole />;
}
