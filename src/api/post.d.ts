import { PostCategory } from "./constants";

export type PostCategoryType = (typeof PostCategory)[number];

export type PostList = {
  slug: string;
  title: string;
  thumbnail?: string;
  published: Date;
};

export type PostListResult = {
  metadatas: PostList[];
  total: number;
  nextToken?: string;
};

export type PostMetadata = {
  title: string;
  published: string;
  thumbnail?: string;
  tags?: string[];
  layout: string;
};
