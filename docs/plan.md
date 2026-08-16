# Add All Posts Listing Page

## Summary

Add a locale-aware all-posts listing at `/{locale}/list`, keeping existing category pages at `/{locale}/list/{category}` unchanged. The page will show published posts for the current locale across all categories, newest first, using the existing card layout and pagination.

## Key Changes

- Update the post list data contract so `PostList` includes `category`, and update `getPostList()` to select/map `category` from Supabase rows.
- Add a new App Router page at `src/app/[locale]/list/page.tsx` that calls `getPostList(locale, undefined, page)` and links cards to `/{locale}/post/{category}/{slug}`.
- Keep category pages working with the same service; they may continue passing `category` explicitly, but links can use `metadata.category` consistently.
- Add an "All" item to the sidebar blog list pointing to `/list`.
- Add `/{locale}/list` entries to `src/app/sitemap.ts`.

## Interface Changes

- `PostList` includes `slug`, `title`, `category`, `thumbnail`, and `published`.
- `getPostList(locale, category?, page?, limit?)` keeps the same call signature and now returns list metadata that includes `category`.

## Test Plan

- Run `pnpm lint`.
- Run `pnpm build`.
- Manually verify `/en-US/list` and `/ko/list` show all published posts for that locale.
- Manually verify category pages still filter by category and cards navigate to valid post detail URLs.
- Manually verify pagination links preserve `/list?page=N` for all posts and `/list/{category}?page=N` for category pages.

## Assumptions

- "All posts" means all published posts in the current locale, not posts across every locale.
- The new canonical route is `/{locale}/list`.
- Existing visual style should be reused rather than redesigned.
