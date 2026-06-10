import { getPostSitemapEntries } from "@/api/posts.service";
import { PostCategory } from "@/api/constants";
import { MetadataRoute } from "next";

const baseUrl = "https://www.412ock.dev";
export const locales = ["en-US", "ko"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSitemapEntries();
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  for (const category of PostCategory) {
    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}/list/${category}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  sitemap.push(
    ...posts.map((post) => ({
      url: `${baseUrl}/${post.locale}/post/${post.category}/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "never" as const,
      priority: 0.5,
    })),
  );

  return sitemap;
}
