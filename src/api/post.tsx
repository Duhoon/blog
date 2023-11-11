import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

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

export async function getPostList(){
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
    return resultLists;
}

export async function getPostDetailed(filename: string){
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