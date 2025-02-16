import Link from "next/link";
import { getPostListByPageFromCloud } from "@/api/post";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "../layout.module.scss";
import { PostCategory } from "@/types/post.type";
import PaginationButton from "@/components/commons/Button/PaginationButton";

type Props = {
  params: {
    category: PostCategory;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
    beforeToken?: string;
    currentToken?: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { metadatas, nextToken } = await getPostListByPageFromCloud(
    params.category,
    searchParams.currentToken,
  );
  // process.env.POST_LOCATION === "local"
  //   ? await getPostListFromLocal()

  return (
    <div>
      <ul>
        {metadatas.length > 0 ? (
          metadatas.map((metadata) => (
            <li key={metadata.slug}>
              <Link href={`/post/${params.category}/${metadata.slug}`}>
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
