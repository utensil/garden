---
title: Layout & spacing tweaks
date: 2025-07-19
tag: features/ui
---

## Feature

A batch of layout and spacing refinements over the stock Quartz theme to make
the garden read better on both desktop and mobile:

- Less wasted space at the top of every page.
- Page title dropped from the sidebar; search/dark-mode/reader-mode grouped into
  a compact control row.
- Table of contents promoted to the left sidebar on desktop; explorer moved to
  the right (desktop) or kept inline (mobile).
- Footer link relabelled `Source`.
- Tighter code-block padding so the copy button no longer triggers a scrollbar.

## Usage

These are baked into the layout — no per-page configuration. The arrangement
applies to both the content-page and list-page layouts.

## Implementation

Spread across several commits, touching layout config and base styles:

- `quartz.layout.ts` — comments out `PageTitle()`; reorders the `Flex` control
  row to `Darkmode`, `ReaderMode`, `Search` (drops `grow`); puts
  `DesktopOnly(TableOfContents())` in the left column and moves `Explorer` to
  the right column on desktop / `MobileOnly` inline; reorders the right column
  to `Backlinks`, `Graph`. Footer link key renamed `GitHub` → `Source`
  (`e7b2436`). The list-page layout gets the same treatment.
- `quartz/styles/variables.scss` (`fec0c3f`) — `$topSpacing` cut from `6rem` to
  `2.5rem`.
- `quartz/components/ArticleTitle.tsx` + `quartz/styles/base.scss` (`34e0cb0`) —
  article-title top margin `2rem` → `1rem`; mobile sidebar `padding-top`
  `2rem` → `1rem`.
- `quartz/styles/base.scss` (`02dc856`) — `pre code` vertical padding `0.5rem` →
  `1rem` so the overflowing clipboard button stops forcing a horizontal
  scrollbar.
- `quartz/components/styles/explorer.scss` (`208dd0b`) — `position: relative` on
  the mobile explorer button so its `z-index` actually takes effect (a static
  element ignores `z-index`).
