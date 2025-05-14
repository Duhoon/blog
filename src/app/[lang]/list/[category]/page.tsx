import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "../layout.module.scss";
import { PostCategory } from "@/types/post.type";
import PaginationButton from "@/components/commons/Button/PaginationButton";
import { getPostList } from "@/api/posts.supabase";

type Props = {
  params: Promise<{
    lang: string;
    category: PostCategory;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    beforeToken?: string;
    currentToken?: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { lang, category } = await params;

  const { metadatas, nextToken } = await getPostList(lang, category);

  return (
    <div>
      <ul>
        {metadatas.length > 0 ? (
          metadatas.map((metadata) => (
            <li key={metadata.slug}>
              <Link href={`/${lang}/post/${category}/${metadata.slug}`}>
                {metadata.thumbnail ? (
                  <div className={styles["board-item-thumbnail"]}>
                    <Image
                      src={metadata.thumbnail}
                      alt={`${metadata.title} thumbnail`}
                      width={200}
                      height={300}
                    ></Image>
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles["board-item-info"]}>
                  <h2>{metadata.title}</h2>
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
      {nextToken ? <PaginationButton nextToken={nextToken} /> : ""}
    </div>
  );
}
