import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import { list, ref, getMetadata } from 'firebase/storage';
import { storage } from '@/config/firebase';

type PostList = {
    slug: string;
    title: string;
    published: Date;
};

type PostMetadata = {
    title: string;
    published: string;
    layout: string;
}

export async function getPostListFromLocal(){
    const postLists = fs.readdirSync('src/post');

    const resultLists: PostList[] = [];
    for( let post of postLists){
        const postFile = fs.readFileSync(`src/post/${post}`, 'utf-8');
        
        const postMetadata = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkParseFrontmatter)        
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(postFile);

        const metadata = postMetadata.data.frontmatter as PostMetadata;

        resultLists.push({
            slug: post.replace(/\.md/,''),
            title: metadata.title,
            published: new Date(metadata.published),
        })
    }

    resultLists.sort((a,b)=>b.published.getTime() - a.published.getTime());
    return resultLists;
}

export async function getPostDetailedFromLocal(filename: string){
    const postFile = fs.readFileSync(`src/post/${filename}.md`, 'utf-8');

    const post2html = await unified()
        // .use(remarkMdxFrontmatter)
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(remarkParseFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(postFile);

    const metadata = post2html.data.frontmatter as any;

    return {
        title: metadata.title,
        published: new Date(metadata.published),
        content: post2html.value.toString()
    };
}

export async function getPostListFromCloud(
        start?: number, 
        length: number = 10
    ): Promise<PostList[]> {
    const postsRef = ref(storage, 'posts');

    const postsList = await list(postsRef, { maxResults: length })
    const metadatas = await Promise.all(postsList.items.map( item => {
            const metadata = getMetadata(item)
            return metadata;
        })
    )

    return metadatas.map( metadata => ({
        slug: metadata.name.replace(/\.md/,''),
        title: metadata.customMetadata?.title || '',
        published: new Date(metadata.timeCreated),
    }) as PostList);
}