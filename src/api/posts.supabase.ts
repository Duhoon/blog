import { createClient } from "@supabase/supabase-js";
import path from "path";
import { convertPostToHtml, exportFrontmatter } from "./utils";
import { PostCategory, PostList, PostListResult, PostMetadata } from "./post";

const supabaseUrl = "https://rpghzgqushnkznqrdbeq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = "blog-contents";
const storage = supabase.storage.from(BUCKET_NAME);

export async function getPostList(
  lang: string,
  directory?: PostCategory,
): Promise<PostListResult> {
  const filepath = path.join("posts", lang, directory || "");
  const postsList = await callGetPostList(filepath);

  const postRefList = postsList.map((item) => {
    const {
      data: { publicUrl },
    } = storage.getPublicUrl(path.join(filepath, item.name));
    return [publicUrl, item.name];
  });

  const metadatas = [];
  const posts = await Promise.all(
    postRefList.map(async ([url, name]) => {
      const post = await (await fetch(url)).text();
      return [post, name];
    }),
  );
  for (const [data, name] of posts) {
    try {
      const metadata = await exportFrontmatter(data).then(
        (parsedData) => parsedData.data.frontmatter as PostMetadata,
      );

      metadatas.push({
        title: metadata.title,
        published: new Date(metadata.published),
        thumbnail: metadata.thumbnail,
        slug: name.replace(".md", ""),
      } as PostList);
    } catch (err) {
      console.log(`"${name}" file download doesn't worked`, err);
    }
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

  const post = await fetch(publicUrl, { cache: "force-cache" }).then((res) =>
    res.text(),
  );

  const post2html = await convertPostToHtml(post);

  const metadata = post2html.data.frontmatter as PostMetadata;

  return {
    title: metadata.title,
    published: new Date(metadata.published),
    tags: metadata.tags,
    content: post2html.value.toString(),
    thumbnail: metadata.thumbnail,
  };
}

export async function callGetPostList(path: string) {
  const { data, error } = await storage.list(path, {
    limit: 100,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
