import { createClient } from "@supabase/supabase-js";
import path from "path";
import { convertPostToHtml } from "./utils";
import { PostList, PostListResult, PostMetadata } from "./post";

const supabaseUrl = "https://rpghzgqushnkznqrdbeq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = "blog-contents";
const storage = supabase.storage.from(BUCKET_NAME);

export async function getPostList(
  lang: string,
  directory?: string,
): Promise<PostListResult> {
  const filepath = path.join("posts", lang, directory || "");

  const { data: postsList, error } = await storage.list(filepath, {
    limit: 100,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    throw new Error(error.message);
  }

  const postRefList = postsList.map((item) => {
    const {
      data: { publicUrl },
    } = storage.getPublicUrl(path.join(filepath, item.name));
    return [publicUrl, item.name];
  });

  const metadatas = [];
  for (const [url, name] of postRefList) {
    const post = await fetch(url).then((res) => res.text());
    const postInBlob = await new Blob([post], { type: "text/plain" }).text();
    const metadata = await convertPostToHtml(postInBlob).then(
      (parsedData) => parsedData.data.frontmatter as PostMetadata,
    );

    metadatas.push({
      title: metadata.title,
      published: new Date(metadata.published),
      thumbnail: metadata.thumbnail,
      slug: name,
    } as PostList);
  }

  metadatas.sort((a, b) => b.published.getTime() - a.published.getTime());

  return { metadatas };
}

export async function getPostDetailed(
  lang: string,
  directory: string,
  filename: string,
) {
  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path.join("posts", lang, directory, `${filename}.md`));

  const post = await fetch(publicUrl).then((res) => res.text());
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
