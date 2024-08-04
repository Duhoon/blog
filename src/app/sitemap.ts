import { getPostListFromCloud } from "@/api/post";
import { MetadataRoute } from "next";

const baseUrl = 'https://www.412ock.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/board`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    const categories = ['development', 'book', 'movie'];
    
    for (const category of categories) {
        const posts = await getPostListFromCloud(category);
        sitemap.push({
            url: `${baseUrl}/blog/${category}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        })

        const info = posts.map(post => ({
            url: `${baseUrl}/post/${category}/${post.slug}`,
            lastModified: new Date(post.published),
            changeFrequency: 'monthly',
            priority: 0.5,
        })) as MetadataRoute.Sitemap;
        sitemap.push(...info);
    }
    
    return sitemap;
}