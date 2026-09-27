import { Metadata } from "next";
import { PostCategoryType } from "@/api/post";
import { getPostList } from "@/api/posts.service";
import PostList from "@/components/list/post-list";

type Props = {
  params: Promise<{
    locale: string;
    category: PostCategoryType;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    page?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;

  return {
    title: `${category} Posts - ALROCK Blog`,
    description: `Browse all ${category} posts and articles on ALROCK Blog. Find the latest insights, tutorials, and discussions about ${category}.`,
    keywords: `${category}, blog posts, articles, ${locale}`,
    openGraph: {
      title: `${category} Posts - ALROCK Blog`,
      description: `Browse all ${category} posts and articles on ALROCK Blog.`,
      type: "website",
      locale: locale,
    },
    alternates: {
      canonical: `https://412ock.dev/${locale}/list/${category}`,
    },
  };
}

export default async function ListPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  let { page = 1 } = await searchParams;
  if (typeof page == "string") {
    page = parseInt(page);
  }

  const { total, metadatas } = await getPostList(locale, category, page);

  return (
    <PostList
      locale={locale}
      title={category[0].toUpperCase() + category.slice(1)}
      posts={metadatas}
      total={total}
      page={page}
      paginationPath={`/list/${category}`}
    />
  );
}
