"use client";

import {
  LucideIcon,
  List,
  Notebook,
  Clapperboard,
  BookOpenText,
  ChevronDown,
  BriefcaseBusiness,
} from "lucide-react";
import {
  SidebarContent as SidebarContentWrapper,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { Link as LocaleLink } from "@/i18n/navigation";

interface CategoryItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const bloglist: CategoryItem[] = [
  {
    title: "All",
    href: "/list",
    icon: List,
  },
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
];

export default function SidebarContent() {
  return (
    <SidebarContentWrapper>
      <PageMenu title="Portfolio" href="/portfolio" icon={BriefcaseBusiness} />
      <Category title={"Blog"} list={bloglist} />
    </SidebarContentWrapper>
  );
}

function PageMenu({ title, href, icon: Icon }: CategoryItem) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-lg font-medium">
              <LocaleLink href={href}>
                <Icon />
                <span>{title}</span>
              </LocaleLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function Category({ title, list }: { title: string; list: CategoryItem[] }) {
  return (
    <Collapsible className="group/collapsible" defaultOpen>
      <SidebarGroup>
        <SidebarGroupLabel className={"mb-2"} asChild>
          <SidebarMenuButton asChild>
            <CollapsibleTrigger>
              <span className={"text-lg"}>{title}</span>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarMenuButton>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {list.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
