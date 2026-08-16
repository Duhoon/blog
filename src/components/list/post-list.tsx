import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import { PostList as PostListItem } from "@/api/post";
import Pagination from "@/components/list/pagination";
import { Separator } from "@/components/ui/separator";

interface PostListProps {
  locale: string;
  title: string;
  posts: PostListItem[];
  total: number;
  page: number;
  paginationPath: string;
  paginationQuery?: Record<string, string | number | undefined>;
}

export default function PostList({
  locale,
  title,
  posts,
  total,
  page,
  paginationPath,
  paginationQuery,
}: PostListProps) {
  return (
    <div className={"p-4 w-full min-h-[calc(100svh-3.5rem)] flex flex-col"}>
      <div
        className={
          "flex justify-center flex-col items-center justify-center gap-2 mb-4"
        }
      >
        <h1 className={"w-auto text-muted-foreground font-semibold"}>
          412ock Blog
          <Separator className={"mt-4 w-4"} />
        </h1>
        <h2 className={"font-bold text-2xl"}>{title}</h2>
      </div>
      <ul
        className={
          "w-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      >
        {posts.length > 0 ? (
          posts.map((metadata) => (
            <li
              className={
                "relative min-h-96 w-full lg:w-84 shadow-md rounded-lg overflow-hidden"
              }
              key={`${metadata.category}/${metadata.slug}`}
            >
              <Link
                href={`/${locale}/post/${metadata.category}/${metadata.slug}`}
              >
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
      <Pagination
        path={paginationPath}
        total={total}
        page={page}
        query={paginationQuery}
      />
    </div>
  );
}
