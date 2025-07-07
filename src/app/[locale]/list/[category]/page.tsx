import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import { PostCategory } from "@/api/post";
import { getPostList } from "@/api/posts.supabase";

type Props = {
  params: Promise<{
    locale: string;
    category: PostCategory;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    beforeToken?: string;
    currentToken?: string;
  }>;
};

export default async function ListPage({ params }: Props) {
  const { locale, category } = await params;
  const { metadatas } = await getPostList(locale, category);

  return (
    <div className="p-4 w-full flex flex-col justify-center">
      <ul className="w-full grid grid-cols-1 lg:grid-cols-3 justify-evenly gap-8">
        {metadatas.length > 0 ? (
          metadatas.map((metadata) => (
            <li
              className="relative min-h-96 w-full lg:w-84 shadow-md rounded-lg"
              key={metadata.slug}
            >
              <Link href={`/${locale}/post/${category}/${metadata.slug}`}>
                <div className="w-full h-64 relative overflow-hidden">
                  <Image
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50"
                    src={
                      metadata.thumbnail || "https://placehold.co/600x400/png"
                    }
                    alt={`${metadata.title} thumbnail`}
                    width={600}
                    height={400}
                  />
                </div>
                <div className="w-full absolute p-4 bottom-0">
                  <h2 className="font-bold text-lg mb-2">{metadata.title}</h2>
                  <p>{dayjs(metadata.published).format("MMMM DD, YYYY")}</p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li style={{ textAlign: "center" }}>
            <a>There is no post</a>
          </li>
        )}
      </ul>
    </div>
  );
}
