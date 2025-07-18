import { callGetPostList } from "@/api/posts.supabase";
import { PostCategory } from "@/api/constants";
import { MetadataRoute } from "next";
import path from "path";

const baseUrl = "https://www.412ock.dev";
export const locales = ["en-US", "ko"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      const filepath = path.join("posts", locale, category);
      const { data } = await callGetPostList(filepath, 1, 1000);
      sitemap.push({
        url: `${baseUrl}/${locale}/list/${category}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });

      const info = data.map((row) => ({
        url: `${baseUrl}/${locale}/post/${category}/${row.name.replace(".md", "")}`,
        lastModified: new Date(row.updated_at),
        changeFrequency: "never",
        priority: 0.5,
      })) as MetadataRoute.Sitemap;
      sitemap.push(...info);
    }
  }

  return sitemap;
}
