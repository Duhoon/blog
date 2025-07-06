import Link from "next/link";
import {
  SidebarHeader as SBHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";

export default function SidebarHeader() {
  return (
    <SBHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className={"h-12"} asChild>
            <Link href="/">
              <div className="bg-primary relative text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg overflow-hidden">
                <Image
                  src={"/logo-light.png"}
                  alt={"blog logo"}
                  className={"size-12"}
                  fill
                />
              </div>
              <span className={"font-semibold text-xl"}>412ock</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SBHeader>
  );
}
