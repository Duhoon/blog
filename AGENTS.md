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

## UI & Styling Guidelines

- Use **Tailwind CSS** as the primary styling solution for all frontend components and pages.
- Use **shadcn/ui** as the preferred component library for building user interfaces.
- Always check for existing shadcn/ui components before implementing custom UI components.
- Reuse and extend existing components instead of creating duplicate implementations.
- Use Tailwind CSS utility classes for layout, spacing, typography, colors, borders, and responsive design.
- Follow a **mobile-first** approach using Tailwind CSS responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- Use the project's existing `cn()` utility for conditional class composition.
- Follow the existing design system, including theme variables, colors, typography, spacing, and component variants.
- Prefer semantic design tokens such as `bg-background`, `text-foreground`, `bg-primary`, and `text-muted-foreground` over hardcoded colors.
- Customize shadcn/ui components using Tailwind CSS classes and existing component variants.
- Use existing shadcn/ui components for buttons, dialogs, forms, inputs, cards, tables, and other common UI patterns.
- Preserve accessibility features provided by shadcn/ui, including keyboard navigation, focus management, and ARIA attributes.
- Avoid inline styles, CSS Modules, and custom CSS unless Tailwind CSS cannot reasonably achieve the required styling.
- Avoid arbitrary Tailwind CSS values (e.g., `w-[347px]`) unless necessary.
- Do not introduce additional UI component libraries or styling frameworks unless explicitly requested.
- Keep components reusable, consistent, accessible, and maintainable.

### Component Implementation Priority

When implementing UI components, follow this priority:

1. **Existing project components** — Reuse components already implemented in the project.
2. **shadcn/ui components** — Use or install appropriate shadcn/ui components when available.
3. **Tailwind CSS** — Build custom UI using Tailwind CSS utilities when no suitable component exists.
4. **Custom CSS** — Use only when the above approaches are insufficient.

## Git Workflow & Commit Guidelines

- Automatically create a Git commit after successfully completing an implementation task.
- Do not wait for explicit user confirmation before committing completed changes.
- Before committing, review the changes using `git diff` and `git status`.
- Run relevant lint, type checks, and tests when available.
- Only commit changes related to the current task.
- Do not include unrelated modifications or untracked files in the commit.
- Stage specific files using `git add <file>` instead of `git add .`.
- Write clear and concise commit messages following the **Conventional Commits** specification.
- Use appropriate prefixes:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `refactor:` for code restructuring
  - `style:` for UI or styling changes
  - `docs:` for documentation changes
  - `chore:` for maintenance tasks
- If validation fails, attempt to resolve the issue before committing.
- If validation cannot be completed successfully, report the issue and do not commit unless explicitly instructed.
- Never amend existing commits or force-push unless explicitly requested.
- Never push commits to a remote repository unless explicitly requested.
- After committing, report the commit hash and commit message.

### Completion Workflow

For every implementation task, follow this sequence:

1. Implement the requested changes.
2. Review modified files and verify the implementation.
3. Run relevant validation commands.
4. Stage only task-related files.
5. Create a Git commit with a descriptive Conventional Commit message.
6. Report the implementation summary, validation results, and commit hash.