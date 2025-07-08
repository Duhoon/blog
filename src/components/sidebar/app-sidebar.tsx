import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeader from "./sidebar-header";
import SidebarContent from "./sidebar-content";
import SidebarFooter from "./sidebar-footer";

export function AppSidebar() {
  return (
    <Sidebar className="z-10">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  );
}
