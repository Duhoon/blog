"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GlobalSearchProps {
  locale: string;
}

export default function GlobalSearch({ locale }: GlobalSearchProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  return (
    <form
      action={`/${locale}/list`}
      className="flex min-w-0 flex-1 items-center gap-2"
    >
      <div className="relative w-full">
        <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          className="pl-9"
          type="search"
          name="q"
          defaultValue={searchQuery}
          placeholder="Search posts"
          aria-label="Search posts"
        />
      </div>
      {searchQuery ? (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/${locale}/list`} aria-label="Clear search">
            <X />
          </Link>
        </Button>
      ) : null}
      <Button type="submit" size="icon" aria-label="Search">
        <Search />
      </Button>
    </form>
  );
}
