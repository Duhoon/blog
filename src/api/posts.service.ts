import "server-only";

import { notFound } from "next/navigation";
import { convertPostToHtml, getDescription } from "./utils";
import {
  PostCategoryType,
  PostList,
  PostListResult,
  PostMetadata,
} from "./post";
import { PostCategory } from "./constants";
import { supabase } from "./supabase.server";

type PostListRow = {
  slug: string;
  title: string;
  thumbnail: string | null;
  published_at: string;
};

type PostDetailRow = PostListRow & {
  brief: string | null;
  content: string;
};

export type PostStaticParam = {
  locale: string;
  category: PostCategoryType;
  slug: string;
};

export type PostSitemapEntry = PostStaticParam & {
  updatedAt: Date;
};

type PostRouteRow = {
  locale: string;
  category: PostCategoryType | null;
  slug: string;
  updated_at: string;
};

export async function getPostList(
  locale: string,
  category?: PostCategoryType,
  page = 1,
  limit = 6,
): Promise<PostListResult> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("posts")
    .select("slug,title,thumbnail,published_at", { count: "exact" })
    .eq("locale", locale)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const metadatas = ((data ?? []) as PostListRow[]).map(mapPostListRow);

  return {
    total: count ?? metadatas.length,
    metadatas,
  };
}

export async function getPostDetailed(
  locale: string,
  category: PostCategoryType,
  slug: string,
) {
  const { data, error } = await supabase
    .from("posts")
    .select("slug,title,brief,content,thumbnail,published_at")
    .eq("locale", locale)
    .eq("category", category)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    notFound();
  }

  const row = data as PostDetailRow;
  const post2html = await convertPostToHtml(row.content);
  const content = post2html.value.toString();
  const metadata = (post2html.data.frontmatter ?? {}) as Partial<PostMetadata>;

  return {
    title: row.title,
    description: await getDescription(content),
    published: new Date(row.published_at),
    tags: metadata.tags,
    content,
    thumbnail: row.thumbnail ?? undefined,
  };
}

export async function getPostStaticParams(): Promise<PostStaticParam[]> {
  const rows = await getPublishedRouteRows();

  return rows.map(({ locale, category, slug }) => ({
    locale,
    category,
    slug,
  }));
}

export async function getPostSitemapEntries(): Promise<PostSitemapEntry[]> {
  const rows = await getPublishedRouteRows();

  return rows.map(({ locale, category, slug, updated_at }) => ({
    locale,
    category,
    slug,
    updatedAt: new Date(updated_at),
  }));
}

async function getPublishedRouteRows(): Promise<
  Array<PostRouteRow & { category: PostCategoryType }>
> {
  const { data, error } = await supabase
    .from("posts")
    .select("locale,category,slug,updated_at")
    .eq("is_published", true)
    .not("category", "is", null)
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as PostRouteRow[]).filter(
    (row): row is PostRouteRow & { category: PostCategoryType } =>
      row.category != null && isPostCategory(row.category),
  );
}

function isPostCategory(value: string): value is PostCategoryType {
  return (PostCategory as readonly string[]).includes(value);
}

function mapPostListRow(row: PostListRow): PostList {
  return {
    slug: row.slug,
    title: row.title,
    thumbnail: row.thumbnail ?? undefined,
    published: new Date(row.published_at),
  };
}
