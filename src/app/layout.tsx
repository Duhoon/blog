import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ALROCK Blog",
  description: "Trying to record my dev journey",
  creator: "412ock",
  openGraph: {
    siteName: "ALROCK Blog",
    title: "ALROCK Blog",
    images: "https://bit.ly/3Vdhrjg",
    description: "Trying to record my dev journey",
  },
  twitter: {
    title: "ALROCK Blog",
    creator: "412ock",
    images: "https://bit.ly/3Vdhrjg",
    description: "Trying to record my dev journey",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
