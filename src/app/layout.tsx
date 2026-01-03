import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MK-CLEANING SOLUTIONS | Bins, Driveways, Gardens & Windows",
  description:
    "MK-CLEANING SOLUTIONS provides wheelie bin cleaning, driveway cleaning, garden cleaning, and window cleaning. Reliable, affordable, sparkling results.",
  openGraph: {
    title: "MK-CLEANING SOLUTIONS",
    description:
      "Wheelie bin cleaning, driveway cleaning, garden cleaning, and window cleaning — spotless results, every time.",
    type: "website",
  },
  metadataBase: new URL("https://example.com"), // change when you have domain
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
