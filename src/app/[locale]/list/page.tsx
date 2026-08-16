import { Metadata } from "next";
import { getPostList } from "@/api/posts.service";
import PostList from "@/components/list/post-list";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    page?: string;
    q?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "All Posts - ALROCK Blog",
    description:
      "Browse all posts and articles on ALROCK Blog across every category.",
    keywords: `blog posts, articles, ${locale}`,
    openGraph: {
      title: "All Posts - ALROCK Blog",
      description:
        "Browse all posts and articles on ALROCK Blog across every category.",
      type: "website",
      locale: locale,
    },
    alternates: {
      canonical: `https://412ock.dev/${locale}/list`,
    },
  };
}

export default async function AllPostListPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page: pageParam = 1, q } = await searchParams;
  let page = pageParam;
  if (typeof page == "string") {
    page = parseInt(page);
  }
  const searchQuery = typeof q === "string" ? q.trim() : undefined;

  const { total, metadatas } = await getPostList(
    locale,
    undefined,
    page,
    undefined,
    searchQuery,
  );

  return (
    <PostList
      locale={locale}
      title={"All Posts"}
      posts={metadatas}
      total={total}
      page={page}
      paginationPath={"/list"}
      paginationQuery={searchQuery ? { q: searchQuery } : undefined}
    />
  );
}
