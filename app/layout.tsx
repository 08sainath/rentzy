import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RENTZY — Find your space. Feel at home.",
  description: "Discover verified PGs, apartments and houses for rent. Find a space that feels like home with RENTZY.",
  applicationName: "RENTZY"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
