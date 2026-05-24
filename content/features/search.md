---
title: Search as a button
date: 2025-07-19
tag: features/ui
---

## Feature

Quartz's default search renders as a wide input-bar-styled element in the
sidebar. This fork shrinks it to a compact icon button: just the magnifying
glass, no inline "Search" label and no full-width bar. Clicking it (or pressing
the usual `/` / `Ctrl-K` shortcut) still opens the full search overlay — only
the trigger's resting appearance changed.

## Usage

Nothing to configure. The `Component.Search()` in `quartz.layout.ts` behaves as
before; it simply looks like a small button now. Click the magnifier or use the
keyboard shortcut to open the search modal and type your query.

## Implementation

Purely a CSS change in `quartz/components/styles/search.scss` — the markup in
`Search.tsx` and the behaviour in `search.inline.ts` are untouched upstream
Quartz.

- The button's `<p>` label is hidden (`display: none`), the explicit
  `width: 100%` is dropped, and the muted `color-mix` background is replaced
  with a plain `var(--light)` so the trigger collapses to icon size.
- A follow-up (`f3710a2`) adds `&:focus { outline: 0 }` to the button so it
  doesn't keep a focus ring after you open and then `Esc` out of search.
- The overlay/results styling underneath is unchanged in substance (the bulk of
  the diff is a cosmetic `& >` → `&>` reformat).
