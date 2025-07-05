import { ReactNode } from "react";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html>
      <body>
      <SidebarProvider>
        <AppSidebar/>
        <main>
          <SidebarTrigger/>
          {children}
        </main>
      </SidebarProvider>
      </body>
    </html>
  )
}