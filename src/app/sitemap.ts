import { getPostListFromCloud } from "@/api/post";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = [
        {
            url: 'https://412ock.dev',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://412ock.dev/board',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://412ock.dev/blog',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    const categories = ['development', 'book', 'movie'];
    
    for (const category of categories) {
        const posts = await getPostListFromCloud(category);
        sitemap.push({
            url: `https://412ock.dev/blog/${category}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        })

        const info = posts.map(post => ({
            url: `https://412ock.dev/post/${category}/${post.slug}`,
            lastModified: new Date(post.published),
            changeFrequency: 'monthly',
            priority: 0.5,
        })) as MetadataRoute.Sitemap;
        sitemap.push(...info);
    }
    
    return sitemap;
}