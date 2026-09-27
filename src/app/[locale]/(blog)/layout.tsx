import { ReactNode, Suspense } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import GlobalSearch from "@/components/search/global-search";

export default async function BlogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="bg-background/95 sticky top-0 z-20 flex min-h-14 w-full items-center gap-2 border-b px-3 py-2 backdrop-blur">
          <SidebarTrigger className="static shrink-0" />
          <Suspense>
            <GlobalSearch locale={locale} />
          </Suspense>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
