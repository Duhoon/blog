import { ReactNode } from "react";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALROCK Blog",
  description: "Trying to record my dev journey",
  creator: "412ock",
  metadataBase: new URL("https://www.412ock.dev"),
  robots: {
    index: true,
    follow: true,
  },
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
  alternates: {
    canonical: "https://412ock.dev",
    languages: {
      "en-US": "https://www.412ock.dev/en-US",
      ko: "https://www.412ock.dev/ko",
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger className="z-10 fixed" />
              {children}
            </main>
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
