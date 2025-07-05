import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeader from "./sidebar-header";
import SidebarContent from "./sidebar-content";
import SidebarFooter from "./sidebar-footer";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  );
}
