import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

/**
 *
 * @description export metadata from markdown file
 * @param postFile
 * @returns
 */
export async function exportFrontmatter(postFile: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkParseFrontmatter)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(postFile);
}

/**
 *
 * @description convert markdown file to HTML
 * @param postFile
 * @returns
 */
export async function convertPostToHtml(postFile: string) {
  const post2html = await unified()
    // .use(remarkMdxFrontmatter)
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkParseFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(postFile);

  return post2html;
}
