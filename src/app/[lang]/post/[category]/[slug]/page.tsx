import { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";
import Reply from "@/components/Reply";
import Image from "next/image";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { getPostDetailed } from "@/api/posts.supabase";
import "highlight.js/styles/github-dark.css";
import styles from "./page.module.scss";
import { PostCategory } from "@/types/post.type";

type Params = {
  lang: string;
  category: PostCategory;
  slug: string;
};
type Props = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category, slug } = await params;

  const { title, tags, thumbnail } = await getPostDetailed(
    lang,
    category,
    slug,
  );

  const openGraph: OpenGraph = {
    title,
    siteName: "ALROCK Blog",
    tags,
    images: thumbnail,
  };

  return {
    title,
    keywords: tags,
    openGraph,
    twitter: {
      title,
    },
    publisher: "412ock",
  };
}

export default async function Page({ params }: Props) {
  const { lang, category, slug } = await params;
  const { title, published, content, thumbnail, tags } = await getPostDetailed(
    lang,
    category,
    slug,
  );

  return (
    <>
      <main>
        <article className={styles[`article-wrapper`]}>
          <div className={styles.article}>
            <div>
              <Link href={`/${lang}/list/${category}`}>Go to Board</Link>
            </div>
            <ul className={styles["tag-list"]}>
              {tags ? (
                tags.map((tag) => <li className={styles["tag-item"]}>{tag}</li>)
              ) : (
                <></>
              )}
            </ul>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.published}>
              {dayjs(published).format("MMMM DD, YYYY")}
            </p>
            {thumbnail ? (
              <div className={styles.thumbnail}>
                <Image
                  src={thumbnail}
                  width={200}
                  height={300}
                  alt="thumbnail"
                />
              </div>
            ) : null}
            <div
              className={styles.post}
              dangerouslySetInnerHTML={{ __html: content }}
              style={{ width: "100%" }}
            ></div>
            <Reply slug={slug} />
          </div>
        </article>
      </main>
    </>
  );
}
