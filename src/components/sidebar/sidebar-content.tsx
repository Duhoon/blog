import { LucideIcon, Notebook, Clapperboard, BookOpenText, ChevronDown } from "lucide-react";
import { SidebarContent as SidebarContentWrapper, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

interface CategoryItem {title: string, href: string, icon: LucideIcon}

const bloglist: CategoryItem[] = [
  {
    title: "Development",
    href: "/list/development",
    icon: Notebook,
  },
  {
    title: "Movie",
    href: "/list/movie",
    icon: Clapperboard,
  },
  {
    title: "Book",
    href: "/list/book",
    icon: BookOpenText,
  },
]

export default function SidebarContent() {
  return (
    <SidebarContentWrapper>
      <Category title={"Blog"} list={bloglist}/>
    </SidebarContentWrapper>
  )
}

function Category({title, list}: {title: string, list: CategoryItem[]}) {
  return (
    <Collapsible className="group/collapsible" defaultOpen>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <SidebarMenuButton asChild>
            <CollapsibleTrigger>
              {title}
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarMenuButton>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {list.map((item)=> 
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon/>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}