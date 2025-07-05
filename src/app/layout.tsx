import { ReactNode } from "react";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html>
      <body>
      <SidebarProvider>
        <AppSidebar/>
        <main className={"w-screen"}>
          <SidebarTrigger/>
          {children}
        </main>
      </SidebarProvider>
      </body>
    </html>
  )
}