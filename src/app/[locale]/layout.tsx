import { ReactNode } from "react";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

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
