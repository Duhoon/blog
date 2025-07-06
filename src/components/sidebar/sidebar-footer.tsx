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
import { useLocale } from "next-intl";
import { usePathname, redirect } from "@/i18n/navigation";

export default function SidebarFooter() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const languageHandler = (localeSelected: string) => {
    if (currentLocale == localeSelected) {
      return;
    } else {
      redirect({ href: pathname, locale: localeSelected });
    }
  };

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
              <DropdownMenuRadioGroup
                value={currentLocale}
                onValueChange={languageHandler}
              >
                <DropdownMenuRadioItem value="en-US">
                  en-US
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ko">ko</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <Separator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <span>Theme</span>
                <Switch disabled />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SBFooter>
  );
}
