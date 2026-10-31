# Markdown portfolio implementation

## Home viewport fit

Reuse SidebarInset with min-h-dvh and min-w-0 for the blog column. Keep the
search header from shrinking and replace Home's h-screen with flex-1/min-h-0
so it occupies the remaining viewport height. Preserve centered title styling
and natural scrolling on lists and posts; do not hide overflow or subtract a
hardcoded header height. Verify both locales, desktop/mobile, sidebar states,
and list/post scrolling; run pnpm lint and pnpm build.

Validation: pnpm lint and pnpm build passed (56 pages). Development HTTP checks
passed for home, list and a post in both locales, confirming SidebarInset,
non-shrinking sticky headers and removal of Home's h-screen. Browser geometry,
sidebar interactions and visual scroll checks could not run because computer-use
startup failed and no connected browser was available.

## Tailwind conversion for project details and shared UI

Replace detail styles with JSX Tailwind utilities and delete project-detail.css.
Details must not import or depend on portfolio.css. Convert shared Markdown,
cover buttons and gallery styling to Tailwind, retaining existing portfolio
layouts and placeholder previews. Move context-specific sizes into component
props/caller classes and remove obsolete shared CSS rules. Keep Swiper's vendor
CSS. Preserve visuals, responsive behavior, accessibility, navigation and content.
Verify direct/client navigation, both locales, Markdown, covers and galleries on
desktop/mobile; run lint and production build. No new packages or CSS files.

Tailwind validation completed: lint and production build passed (56 pages).
Chrome verified Korean desktop and English mobile detail layouts, direct entry
without portfolio.css, client navigation from the portfolio, and gallery sizing,
image navigation and focus restoration. Existing portfolio intro/experience text
sizes and work/archive cover ratios were checked at desktop and mobile widths.
A temporary Markdown fixture verified headings, lists, quote colors, tables,
images, code scrolling, disabled translations and no mobile page overflow. The
fixture was removed and the viewport override was reset. Shared UI no longer
uses pf-prose, pf-cover or pf-gallery CSS; project-detail.css was removed.

## Project detail pages

Build localized static /{locale}/portfolio/projects/{projectId} case studies.
Reuse Markdown metadata for the overview and its body for detail prose; leave
existing project content untouched. Use a white header, dark panel, 1120px outer
width and 760px prose with native vertical scrolling on all screen sizes.
Link selected work and archive to details, preserve cover galleries, return to
the selected project, and offer ordered previous/next and available translations.
Reject missing/draft projects, add project metadata and sitemap entries, and
document a Markdown authoring template. Check both locales, empty/long content,
optional fields, missing translations, navigation and galleries; run lint/build.

Validation completed: lint and production build passed (56 pages, including eight
localized project details). Development HTTP checks covered all eight routes,
metadata, alternate/canonical links, neighboring projects, overview links and 404s.
Temporary Markdown fixtures verified long prose, headings, lists, tables, code,
images, absent optional fields, no inherited share image without a cover, disabled
missing translations and draft/untranslated 404s. Fixtures were removed. The final
sitemap contains exactly eight detail URLs. Korean desktop layout was visually
reviewed. Gallery interaction, focus restoration, English visual layout and mobile
checks remain unverified because native browser automation timed out and then
reported conflicting user input. No existing project content was changed.

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

## Dark central content panel

Keep the white header, footer and outer frame. Theme only the central Swiper
with charcoal #151817, raised surfaces #222824, text #F3F5F2, secondary text
#B4BDB6, dividers #39443D and accent #A6D6B2. Preserve image/preview colors
and the gallery. Desktop uses existing outer horizontal spacing, 12px vertical
gaps, 16px corners and 24–48px inner padding; mobile uses 12px outer spacing,
20px inner padding and 12px corners. Keep fixed bars and current navigation.
Verify both locales, all sections, short desktop/mobile layouts, transitions,
scrolling and gallery behavior; run lint and an isolated production build.

Dark panel validation passed: pnpm lint and isolated pnpm build (48 static
pages). Chrome checked both locales, all sections, fixed bars during transitions,
white gallery, panel margins, short desktop and mobile navigation/overflow.
Desktop and mobile screenshots were visually reviewed.

## English portfolio translation

- Translate all nine Korean portfolio Markdown files into en-US with matching
  filenames: profile, four experiences, and four projects.
- Replace the five English example project/experience files. Preserve YAML keys,
  ordering, flags, stacks, asset paths, URLs, and contact details. Translate prose
  and dates faithfully, including planned completion and launch status.
- Leave Korean content and application code unchanged. Validate file parity,
  metadata and assets; run pnpm lint and pnpm build, then check both portfolio
  locales in the development server, including layout, links and galleries.

Translation validation: all nine paths match the Korean originals; YAML parsing,
metadata parity, cover assets and untranslated-text checks passed. pnpm lint and
pnpm build passed (48 pages; build required network access for existing blog data).
Both development routes returned translated/original content as expected, including
contact links and gallery asset references. Visual layout and gallery interaction
checks remain unverified: browser automation stalled at Chrome profile selection.
