import { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { getPostDetailed, getPostList } from "@/api/posts.supabase";
import "highlight.js/styles/github-dark.css";
import { PostCategoryType } from "@/api/post";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostCategory } from "@/api/constants";
import { locales } from "@/i18n/routing";

type Params = {
  locale: string;
  category: PostCategoryType;
  slug: string;
};
type Props = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const params: Params[] = [];

  for (const locale of locales) {
    for (const category of PostCategory) {
      const postLists = await getPostList(locale, category, 1, 99);
      params.push(
        ...postLists.metadatas.map(
          (metadata): Params => ({
            locale,
            category,
            slug: metadata.slug,
          }),
        ),
      );
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params;

  const { title, description, tags, thumbnail } = await getPostDetailed(
    locale,
    category,
    slug,
  );

  const openGraph: OpenGraph = {
    title,
    description,
    siteName: "ALROCK Blog",
    tags,
    images: thumbnail,
  };

  return {
    title,
    description,
    keywords: tags,
    openGraph,
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      title,
    },
    publisher: "412ock",
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, category, slug } = await params;
  const { title, published, content, thumbnail, tags } = await getPostDetailed(
    locale,
    category,
    slug,
  );

  return (
    <article className="flex justify-center">
      <div className="w-full lg:w-256 p-8">
        <div className="text-center">
          <Link href={`/${locale}/list/${category}`}>Go to Board</Link>
        </div>
        <div className="w-full flex flex-wrap gap-1 my-2">
          {tags ? (
            tags.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)
          ) : (
            <></>
          )}
        </div>
        <h1 className="text-center font-bold text-4xl py-4">{title}</h1>
        <p className="text-center">
          {dayjs(published).format("MMMM DD, YYYY")}
        </p>
        <Separator className="my-4" />
        {thumbnail ? (
          <div>
            <Image src={thumbnail} width={200} height={300} alt="thumbnail" />
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </article>
  );
}
