import fs from "fs";
import { convertPostToHtml } from "./utils";
import { PostList, PostMetadata } from "./post";

export async function getPostListFromLocal() {
  const postLists = fs.readdirSync("post");

  const resultLists: PostList[] = [];
  for (const post of postLists) {
    const postFile = fs.readFileSync(`post/${post}`, "utf-8");

    const postMetadata = await convertPostToHtml(postFile);

    const metadata = postMetadata.data.frontmatter as PostMetadata;

    resultLists.push({
      slug: post.replace(/\.md/, ""),
      title: metadata.title,
      published: new Date(metadata.published),
    });
  }

  resultLists.sort((a, b) => b.published.getTime() - a.published.getTime());
  return resultLists;
}

export async function getPostDetailedFromLocal(filename: string) {
  const postFile = fs.readFileSync(`post/${filename}.md`, "utf-8");

  const post2html = await convertPostToHtml(postFile.toString());

  const metadata = post2html.data.frontmatter as PostMetadata;

  return {
    title: metadata.title,
    published: new Date(metadata.published),
    tags: metadata.tags,
    content: post2html.value.toString(),
    thumbnail: metadata.thumbnail,
  };
}
