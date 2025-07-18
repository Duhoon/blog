import { createClient } from "@supabase/supabase-js";
import path from "path";
import { convertPostToHtml, exportFrontmatter, getDescription } from "./utils";
import {
  PostCategoryType,
  PostList,
  PostListResult,
  PostMetadata,
} from "./post";
import { notFound } from "next/navigation";

const supabaseUrl = "https://rpghzgqushnkznqrdbeq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = "blog-contents";
const storage = supabase.storage.from(BUCKET_NAME);

export async function getPostList(
  lang: string,
  directory?: PostCategoryType,
  page = 1,
): Promise<PostListResult> {
  const filepath = path.join("posts", lang, directory || "");
  const { total, data: postsList } = await callGetPostList(filepath, page);

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
  for (const [file, name] of posts) {
    try {
      const { data } = await exportFrontmatter(file);
      const metadata = data.frontmatter as PostMetadata;

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

  return { total, metadatas };
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

  try {
    const post = await fetch(publicUrl, { cache: "force-cache" }).then((res) =>
      res.text(),
    );
    const post2html = await convertPostToHtml(post);
    const description = await getDescription(post2html.value.toString());

    const metadata = post2html.data.frontmatter as PostMetadata;

    return {
      title: metadata.title,
      description,
      published: new Date(metadata.published),
      tags: metadata.tags,
      content: post2html.value.toString(),
      thumbnail: metadata.thumbnail,
    };
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export async function callGetPostList(path: string, page = 1, limit = 6) {
  const { data, error } = await storage.list(path, {
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    throw new Error(error.message);
  }

  const total = data.length;
  const dataReduced = data.slice((page - 1) * limit, page * limit);

  return { total, data: dataReduced };
}
