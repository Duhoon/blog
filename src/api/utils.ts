import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import classNames from "rehype-class-names";

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
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkParseFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(classNames, {
      h1: "text-4xl font-bold mb-4",
      h2: "text-2xl font-semibold mt-6 mb-2",
      p: "text-base leading-relaxed mb-4",
      ul: "list-disc pl-6 mb-4",
      ol: "list-decimal pl-6 mb-4",
      code: "bg-gray-100 px-1 rounded text-sm text-red-500",
      pre: "mb-4",
      a: "text-blue-600 hover:underline",
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(postFile);

  return post2html;
}
