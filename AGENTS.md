# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 TypeScript blog using the App Router and locale-prefixed routes. Application code lives in `src/`. Pages and route handlers are under `src/app`, including localized routes in `src/app/[locale]`. Shared UI is split between `src/components/ui` for shadcn-style primitives, `src/components/sidebar`, `src/components/list`, and `src/components/utils`. API helpers are in `src/api`, i18n helpers are in `src/i18n`, and utilities are in `src/lib`.

Markdown posts live in `posts/`, organized by locale and category, for example `posts/ko/development/example.md`. Translation catalogs are in `messages/en-US.json` and `messages/ko.json`. Static assets belong in `public/`.

## Build, Test, and Development Commands

Use one package manager consistently for a change; `pnpm-lock.yaml` is present, so examples use pnpm.

- `pnpm dev`: start the local Next.js development server.
- `pnpm build`: create a production build and run framework/type checks.
- `pnpm start`: serve the built production app.
- `pnpm lint`: run the configured Next.js ESLint checks.

## Coding Style & Naming Conventions

Write TypeScript and React components in `.ts` and `.tsx` files. Keep components small and colocate them by feature area when possible. Use the `@/*` alias for imports from `src`, such as `@/lib/utils`.

ESLint extends `next/core-web-vitals`, `next/typescript`, and `prettier`; Prettier violations are lint errors. Follow existing formatting: two-space JSON indentation, double quotes in TypeScript imports, and Tailwind utilities in JSX. Use kebab-case filenames where established, such as `sidebar-content.tsx`.

## Testing Guidelines

No dedicated test framework or `test` script is configured. Before submitting changes, run `pnpm lint` and `pnpm build`. For UI changes, manually verify affected pages in `pnpm dev`, including both supported locales where relevant. If adding tests, place them near the feature and add the matching script to `package.json`.

## Commit & Pull Request Guidelines

Recent commits use short conventional prefixes such as `feat:` and `chore:`. Keep commit subjects imperative and scoped to one change, for example `feat: add localized post metadata`.

Pull requests should include a concise description, screenshots for visible UI changes, affected routes/locales, and any required environment or Supabase notes. Link related issues when available and state which checks were run.

## Security & Configuration Tips

Keep secrets in `.env.local`; do not commit environment files or Supabase keys. When editing content rendering, be careful with markdown, KaTeX, and rehype/remark changes because they affect user-facing post output and build-time rendering.

# PLAN MODE
In plan mode, write file in @root/docs/plan.md before implementation.