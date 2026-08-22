# Style Markdown Blockquotes

## Summary

Make markdown quote blocks visually distinct from normal post content by styling rendered `<blockquote>` elements in the existing markdown-to-HTML pipeline.

## Key Changes

- Update `convertPostToHtml()` in `src/api/utils.ts`.
- Add a `blockquote` entry to the existing `rehype-class-names` mapping.
- Style blockquotes with a left border, muted background, padding, vertical margin, muted text color, and rounded corners.
- Keep markdown parsing and content behavior unchanged.

## Interface Changes

- No route, API, schema, or content format changes.
- Existing markdown syntax like `> quoted text` renders with the new visual style.

## Test Plan

- Run `pnpm lint`.
- Run `pnpm build`.
- Manually verify a post containing markdown blockquote syntax renders the quote separated from surrounding content.
- Verify normal paragraphs, lists, code blocks, and headings keep their current appearance.

## Assumptions

- "Quote in markdown" means markdown blockquotes using `>`.
- The desired behavior is visual separation, not changing quote parsing or adding a custom quote component.
