import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { listAll, ref, getBytes, list } from "firebase/storage";
import { storage } from "@/config/firebase";

type PostList = {
  slug: string;
  title: string;
  thumbnail?: string;
  published: Date;
};

type PostListResult = {
  metadatas: PostList[];
  nextToken?: string;
};

type PostMetadata = {
  title: string;
  published: string;
  thumbnail?: string;
  tags?: string[];
  layout: string;
};

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

  const metadata = post2html.data.frontmatter as PostMetadata;

  return {
    title: metadata.title,
    published: new Date(metadata.published),
    tags: metadata.tags,
    content: post2html.value.toString(),
    thumbnail: metadata.thumbnail,
  };
}

export async function getPostDetailedFromCloud(
  lang: string,
  directory: string,
  filename: string,
) {
  const postRef = ref(storage, `posts/${lang}/${directory}/${filename}.md`);

  const post = await getBytes(postRef);
  const postInText = await new Blob([post], { type: "text/plain" }).text();

  const post2html = await unified()
    // .use(remarkMdxFrontmatter)
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkParseFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(postInText.toString());

  const metadata = post2html.data.frontmatter as PostMetadata;

  return {
    title: metadata.title,
    published: new Date(metadata.published),
    tags: metadata.tags,
    content: post2html.value.toString(),
    thumbnail: metadata.thumbnail,
  };
}

export async function getPostListFromCloud(
  lang: string,
  directory?: string,
): Promise<PostList[]> {
  const dirRef = ref(storage, `posts/${lang}/${directory ? directory : ""}`);

  const postsList = await listAll(dirRef);
  const postRefList = postsList.items.map((item) => {
    return ref(storage, `posts/${lang}/${directory}/${item.name}`);
  });

  const result = [];
  for (const postRef of postRefList) {
    const post = await getBytes(postRef);
    const postInBlob = await new Blob([post], { type: "text/plain" }).text();
    const metadata = await convertPostToHtml(postInBlob.toString()).then(
      (parsedData) => parsedData.data.frontmatter as PostMetadata,
    );

    result.push({
      title: metadata.title,
      published: new Date(metadata.published),
      thumbnail: metadata.thumbnail,
      slug: postRef.name.replace(".md", ""),
    } as PostList);
  }

  return result.sort((a, b) => b.published.getTime() - a.published.getTime());
}

export async function getPostListByPageFromCloud(
  lang: string,
  directory?: string,
  nextToken?: string,
): Promise<PostListResult> {
  const dirRef = ref(storage, `posts/${lang}/${directory ? directory : ""}`);

  const postsList = await list(dirRef, {
    maxResults: 10,
    pageToken: nextToken,
  });
  const postRefList = postsList.items.map((item) => {
    return ref(storage, `posts/${lang}/${directory}/${item.name}`);
  });

  const metadatas = [];
  for (const postRef of postRefList) {
    const post = await getBytes(postRef);
    const postInBlob = await new Blob([post], { type: "text/plain" }).text();
    const metadata = await convertPostToHtml(postInBlob.toString()).then(
      (parsedData) => parsedData.data.frontmatter as PostMetadata,
    );

    metadatas.push({
      title: metadata.title,
      published: new Date(metadata.published),
      thumbnail: metadata.thumbnail,
      slug: postRef.name.replace(".md", ""),
    } as PostList);
  }

  metadatas.sort((a, b) => b.published.getTime() - a.published.getTime());

  return { metadatas, nextToken: postsList.nextPageToken };
}

async function convertPostToHtml(postFile: string) {
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
