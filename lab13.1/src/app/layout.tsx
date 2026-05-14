import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab 13.1 Microservice App",
  description: "Next.js, TypeORM, MongoDB microservice lab",
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
