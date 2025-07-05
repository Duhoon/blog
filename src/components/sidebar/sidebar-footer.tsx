import { 
  SidebarFooter as SBFooter, 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Settings } from "lucide-react";

export default function SidebarFooter() {
  return (
    <SBFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings/>
                  <span>Settings</span>
                  <ChevronsUpDown className={"ml-auto"}/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SBFooter>
  )
}