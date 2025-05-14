import { listAll, ref, getBytes, list } from "firebase/storage";
import { storage } from "@/config/firebase";
import { convertPostToHtml } from "./utils";
import { PostList, PostListResult, PostMetadata } from "./post";

export async function getPostDetailedFromCloud(
  lang: string,
  directory: string,
  filename: string,
) {
  const postRef = ref(storage, `posts/${lang}/${directory}/${filename}.md`);

  const post = await getBytes(postRef);
  const postInText = await new Blob([post], { type: "text/plain" }).text();

  const post2html = await convertPostToHtml(postInText);

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
    const metadata = await convertPostToHtml(postInBlob).then(
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
    const metadata = await convertPostToHtml(postInBlob).then(
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
