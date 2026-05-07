import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Express JSON Demo",
  description: "Next.js app connected to an Express JSON API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
