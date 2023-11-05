import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export async function getPostDetailed(filename: string){
    const postFile = fs.readFileSync(`src/post/${filename}.md`, 'utf-8');

    const post2html = await unified()
        // .use(remarkMdxFrontmatter)
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(()=>{return (tree, file)=>{console.dir(tree)}})
        .use(remarkParseFrontmatter)
        .use(remarkRehype)
        .use(rehypeStringify)
        // .use(remarkSanitize)
        .process(postFile);

    console.dir(post2html);

    return post2html;
}