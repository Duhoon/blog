# Improve Post List Pagination

## Summary

Update blog list pagination to show nearby page links and the last page. Users will see up to 2 pages before and 2 pages after the current page, plus a direct link to the final page and a clear page indicator.

## Key Changes

- Update `src/components/list/pagination.tsx` to compute `totalPages = Math.ceil(total / limit)`.
- Render previous/next controls only when they can move.
- Show nearby page links from `currentPage - 2` through `currentPage + 2`, clamped to valid pages.
- Show first/last page links and ellipses when there are gaps around the nearby page window.
- Show a compact `Page X of Y` indicator.
- Preserve existing query params, including search `q`, on every pagination link.

## Interface Changes

- No route or API changes.
- `ListPagination` keeps the same public props: `path`, `total`, `page`, `limit`, and optional `query`.
- `ListPagination` clamps invalid page values for display and link generation.

## Test Plan

- Run `pnpm lint`.
- Run `pnpm build`.
- Manually verify the first page shows nearby pages, an ellipsis if needed, and the last page.
- Manually verify a middle page shows two pages before and two pages after.
- Manually verify a near-last page does not duplicate the last page.
- Manually verify previous/next visibility is correct.
- Manually verify search results preserve `q` while paginating.
- Manually verify category pages use the same improved pagination.

## Assumptions

- "2 more pages to move up or down" means showing up to 2 page-number links before and after the current page.
- "Show last page" means the final page number should be directly clickable whenever more than one page exists.
