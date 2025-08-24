import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import { Metadata } from "next";
import { PostCategoryType } from "@/api/post";
import { getPostList } from "@/api/posts.supabase";
import Pagination from "@/components/list/pagination";

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
    <div className={"p-4 w-full flex flex-col justify-center"}>
      <ul
        className={
          "w-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      >
        {metadatas.length > 0 ? (
          metadatas.map((metadata) => (
            <li
              className={
                "relative min-h-96 w-full lg:w-84 shadow-md rounded-lg overflow-hidden"
              }
              key={metadata.slug}
            >
              <Link href={`/${locale}/post/${category}/${metadata.slug}`}>
                <div className={"w-full h-64 relative overflow-hidden"}>
                  <Image
                    className={
                      "absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-5"
                    }
                    src={
                      metadata.thumbnail ||
                      "https://placehold.co/600x400/png?text=No+Thumbnail"
                    }
                    alt={`${metadata.title} thumbnail`}
                    width={600}
                    height={400}
                  />
                </div>
                <div className={"w-full absolute p-4 bottom-0"}>
                  <h2 className={"font-bold text-lg mb-2"}>{metadata.title}</h2>
                  <p>{dayjs(metadata.published).format("MMMM DD, YYYY")}</p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className={"text-center"}>
            <a>There is no post</a>
          </li>
        )}
      </ul>
      <Pagination path={`/list/${category}`} total={total} page={page} />
    </div>
  );
}
