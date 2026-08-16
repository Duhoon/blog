# Add Global Blog Search

## Summary

Add a search bar at the top of every locale page through the shared locale layout. Submitting search from any page navigates to `/{locale}/list?q=...`, where the all-post listing shows title-matched results.

## Key Changes

- Add a shared global search component that renders in `src/app/[locale]/layout.tsx`.
- Use a GET form with input name `q` and action `/{locale}/list`.
- Extend `getPostList()` with optional title search while preserving existing category filtering.
- Update `/{locale}/list` to read `q`, pass it to the post service, and preserve it during pagination.
- Keep category pages unfiltered; submitting search always lands on all-post search results.

## Interface Changes

- `getPostList(locale, category?, page?, limit?, searchQuery?)` supports title search.
- List pagination accepts optional query params so `q` can be preserved across pages.

## Test Plan

- Run `pnpm lint`.
- Run `pnpm build`.
- Manually verify search appears on home, all-post list, category list, post detail, and portfolio pages.
- Manually verify searching from any page navigates to `/{locale}/list?q=...`.
- Manually verify results match title only, remain locale-scoped, and pagination preserves `q`.
- Manually verify clearing search returns to `/{locale}/list`.

## Assumptions

- Search scope is title only.
- Search results live on the all-post listing route.
- The top search is a shared layout area, not a sticky overlay during scroll.
