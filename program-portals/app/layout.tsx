import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YVAPE Program Portals",
  description: "Admin and Student portals for YVAPE program management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
