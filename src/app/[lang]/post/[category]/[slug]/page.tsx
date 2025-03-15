import { Metadata } from "next";
import Link from "next/link";
import { getPostDetailedFromCloud } from "@/api/post";
import "highlight.js/styles/github-dark.css";
import styles from "./page.module.scss";
// import { storage } from "@/config/firebase";
// import { ref, listAll } from "firebase/storage";
import dayjs from "dayjs";
import Reply from "@/components/Reply";
import Image from "next/image";
// import { locales } from "@/middleware";

export const dynamicParams = false;

// export async function generateStaticParams() {
//   const dirRef = ref(storage, "posts");
//   const listSubDirRef = await listAll(dirRef).then((res) => res.prefixes);

//   const result: Params[] = [];
//   for (const subDirRef of listSubDirRef) {
//     const namesPost = await listAll(subDirRef).then((res) =>
//       res.items.map((item) => ({
//         category: subDirRef.name,
//         slug: item.name.replace(".md", ""),
//       })),
//     );
//     result.push(...namesPost);
//   }

//   return result;
// }

type Params = {
  lang: string;
  category: string;
  slug: string;
};
type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const { title, tags } = await getPostDetailedFromCloud(lang, category, slug);

  return {
    title,
    keywords: tags,
    openGraph: {
      title,
      siteName: "ALROCK Blog",
      tags,
    },
    twitter: {
      title,
    },
    publisher: "412ock",
  };
}

export default async function Page({ params }: Props) {
  const { lang, category, slug } = await params;
  const { title, published, content, thumbnail, tags } =
    await getPostDetailedFromCloud(lang, category, slug);

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
