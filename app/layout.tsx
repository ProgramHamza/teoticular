import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teo's Life Simulation",
  description: "A narrative-driven life simulation game following Teo from birth to age 18.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
