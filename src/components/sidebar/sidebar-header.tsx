import Link from 'next/link';
import { 
  SidebarHeader as SBHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

export default function SidebarHeader() {
  return (
    <SBHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className={"h-12"} asChild>
            <Link href="/">
              <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg">
                {/* <Image src={"/favicon.ico"} alt={"blog logo"} fill/> */}
              </div>
              <span className={"font-semibold text-xl"}>412ock</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SBHeader>
  )
}