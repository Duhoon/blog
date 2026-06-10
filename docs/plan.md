# Supabase PostgreSQL Post Service Plan

## Summary

Move runtime post reads from Supabase Storage markdown files to the Supabase PostgreSQL `posts` table through a server-only API service. The app will still render markdown with the existing remark/rehype pipeline, but list/detail/static params/sitemap data will come from database rows.

Discovered table state: `posts` has `id`, `title`, `brief`, `content`, `slug`, `locale`, `created_at`, `updated_at`, `published_at`, `thumbnail`, and `is_published`. It has 38 rows, 2 published rows, no `category` column, and no `tags` column.

## Key Changes

- Add `category text` to `public.posts`, backfilled from existing Supabase Storage paths.
- Keep tags in markdown frontmatter and parse them from `content`; do not add a `tags` column.
- Add a server-only Supabase client module using the existing project URL and `SUPABASE_KEY`.
- Add a DB-backed post service and update list page, post page, and sitemap consumers.
- Do not read markdown files or Supabase Storage at runtime after the migration/backfill.

## Service Interface

- `getPostList(locale, category?, page = 1, limit = 6)` queries published rows and returns `PostListResult`.
- `getPostDetailed(locale, category, slug)` queries one published row, renders markdown to HTML, and returns detail metadata.
- `getPostStaticParams()` and `getPostSitemapEntries()` query published DB rows for build-time routes and sitemap output.

## Test Plan

- Run `pnpm lint`.
- Run `pnpm build`.
- Manually verify category list pages, one post detail page, `generateStaticParams`, and sitemap generation.
- Confirm unpublished rows do not appear anywhere public.
