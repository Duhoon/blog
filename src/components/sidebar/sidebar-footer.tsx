"use client";

import {
  SidebarFooter as SBFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SidebarFooter() {
  return (
    <SBFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Settings />
                <span>Preferences</span>
                <ChevronsUpDown className={"ml-auto"} />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <Separator />
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuRadioGroup value="en-US">
                <DropdownMenuRadioItem value="en-US">
                  en-US
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ko">ko</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <Separator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <span>Theme</span>
                <Switch />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SBFooter>
  );
}
