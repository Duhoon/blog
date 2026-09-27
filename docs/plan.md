# Markdown portfolio implementation

## Scope
Build introduction, selected work, archive, and experience/contact. Desktop
(>=1024px) keeps one header and footer stationary and slides only center content.
Mobile displays the same sections vertically. Project detail routes are deferred.

## Content
Read version-controlled Markdown from content/portfolio/{ko,en-US} on the server.
Use profile.md, projects/*.md, and experiences/*.md. YAML holds metadata and
Markdown holds prose. Validate fields and local assets with file-specific errors.
Exclude drafts and sort by order then filename. Matching filenames identify
translations. No Supabase dependency or browser-side parser. Render Markdown/GFM
without executing HTML or MDX. Include labeled examples and an authoring README.
Publish content by committing and deploying.

## Layout and interaction
Move home/list/post into a (blog) route group without changing URLs. Keep shared
locale providers and analytics. Add a sidebar portfolio link. Use Swiper with one
slide, no spacing, looping, or autoplay, and 600ms transitions. Support vertical
wheel, trackpad, touch/drag, arrows, menu, and progress controls. Prioritize nested
scrolling and require a fresh gesture at boundaries. Guard inertia and repeated
transitions. Honor reduced motion; inactive desktop slides are inert. Mobile uses
native scrolling, one header, and anchor navigation. Preserve section/project
selection in URL parameters, locale changes, and responsive transitions.

## Fixed navigation revision

- Render one shared header and bottom area outside Swiper. Use a 100dvh desktop
  grid with rows `auto minmax(0, 1fr) auto`; slides fill only the center row.
- Keep long Markdown vertically scrollable inside the center. Attach wheel input
  only to the Swiper element, so scrolling over navigation does not switch slides.
- Synchronize the shared footer with the active section, including disabled
  previous/next buttons and progress indicators. Keep example notices below it.
- Preserve focus on shared navigation controls; move focus out of content that
  becomes inactive. Retain mobile native vertical scrolling, one sticky header,
  and the hidden slide-navigation footer.
- Check header/footer coordinates before, during, and after transitions, nested
  scrolling, short viewports, both locales, mobile, and state restoration.
- Run lint and a production build in an isolated copy to avoid disturbing the
  running development server.

## Validation
Check Markdown edits/additions/deletion, order, drafts, malformed fields, missing
translations/assets, long content, keyboard/focus, reduced motion, wheel boundaries,
resizing, URL restore, both locales, and legacy routes. Run pnpm lint and pnpm build.
Document environment-related limitations.

## Completed validation

- `pnpm lint` and TypeScript checks passed.
- `pnpm build` passed, generating both portfolio locales and all 47 static pages.
  The existing blog requires Supabase network access during the full build.
- Headless Chrome verified wheel/trackpad/drag, inertia guards, keyboard focus,
  project selection, mobile reflow, URL reload/back navigation, language changes,
  reduced motion, and existing home/list/category/post routes.
- Temporary Markdown fixtures verified discovery, sorting, drafts, local images,
  GFM rendering, unsafe HTML/link handling, long-content scrolling, missing
  translations, field/YAML/image errors, and removal. Fixtures were cleaned up.
- Fixed navigation revision passed lint and an isolated production build. Chrome
  verified stationary header/footer coordinates during transitions, center-only
  wheel handling, shared-control focus, both locales, mobile, short viewports,
  reduced motion, URL restoration, and nested long-content scroll boundaries.

## Project image gallery

- Discover direct image files in public/portfolio/{Markdown filename ID}; include
  PNG, JPEG, WebP, GIF, AVIF and SVG, cover first then natural filename order.
  Pass serializable src/alt entries in Project.images without changing Markdown.
- Open one Radix Dialog portal from work/archive covers. Show a contained large
  image, thumbnails, counter, buttons, arrow keys and touch Swiper navigation.
  Keep archive project navigation separate; no nested buttons.
- Preserve background section, URL and scrolling; block background input while
  open. Trap focus, restore the opener, support Escape/backdrop/close and reduced
  motion. Handle empty folders, single images and load failures.
- Document authoring, localize labels, verify both locales and mobile/desktop,
  then run lint and an isolated production build.

Gallery validation completed: lint, TypeScript and isolated production build passed
(47 static pages). Chrome verified both locales, cover-first natural order,
thumbnail/keyboard navigation, archive actions, focus trap/return, backdrop and
Escape dismissal, background locking, single GIF, mobile drag/scroll restoration,
empty folders and failed images. Temporary fixtures were removed.
