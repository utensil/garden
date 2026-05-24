---
title: Posts vs. notes tag system
date: 2025-08-05
tag: features/content
---

## Feature

A lightweight content taxonomy built on tags. A page tagged `post` is a
"post" — a more invested, milestone-worthy piece meant for sharing; everything
else is a "note". The home page surfaces both: two columns showing recent posts
and recent notes side by side. The tag listing page is decluttered and sorted by
how many pages carry each tag, with the count shown inline next to the tag name.

## Usage

- Tag a page `post` in its frontmatter (`tags: [post]`) to make it a post;
  leave it untagged (or tag it anything else) to keep it a note.
- The index page automatically renders "Recent posts" and "Recent notes" in two
  columns — no per-page setup.
- The `/tags` page lists every tag with its page count, ordered most-used first.

## Implementation

- `quartz.layout.ts` — `afterBody` gets a `ConditionalRender` (only on the index
  slug) wrapping a two-column `Flex` of `RecentNotes`. "Recent posts" filters on
  `frontmatter.tags.includes("post")` with `showTags: false`; "Recent notes"
  filters on `!tags.includes("post")` and excludes any `…/index` slug. The
  filter started as a path regex (`/^posts/`) and a `notes` tag, then was
  reworked to the post/non-post split (`5756e9c`, `6943bbe`, `77f7a4f`); the
  conditional was also refactored from per-component to a single wrapper
  (`779993b`).
- `quartz/components/pages/TagContent.tsx` — tags are sorted by descending page
  count (`tags.sort((a, b) => map.get(b).length - map.get(a).length)`), the
  tag-name heading appends `<span>{pages.length}</span>`, and the verbose
  per-tag description + "N items under this tag" page listing are gated off
  (`{false && …}`) for a cleaner index.
- `quartz/components/TagList.tsx` — styles that inline count `span` small and
  muted (`color: #666; font-size: 0.6em`).
