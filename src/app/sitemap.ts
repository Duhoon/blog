import { getPostList } from "@/api/posts.supabase";
import { locales } from "@/middleware";
import { PostCategory } from "@/types/post.type";
import { MetadataRoute } from "next";

const baseUrl = "https://www.412ock.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/list`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const categories = ["development", "book", "movie"] as PostCategory[];
  for (const category of categories) {
    for (const locale of locales) {
      const { metadatas } = await getPostList(locale, category);
      sitemap.push({
        url: `${baseUrl}/${locale}/list/${category}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });

      const info = metadatas.map((metadata) => ({
        url: `${baseUrl}/${locale}/post/${category}/${metadata.slug}`,
        lastModified: new Date(metadata.published),
        changeFrequency: "monthly",
        priority: 0.5,
      })) as MetadataRoute.Sitemap;
      sitemap.push(...info);
    }
  }

  return sitemap;
}
