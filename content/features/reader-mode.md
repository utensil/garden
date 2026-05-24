---
title: Reader mode
date: 2025-07-19
tag: features/ui
---

## Feature

Quartz ships a reader-mode toggle that hides the side panels (explorer, graph,
backlinks, table of contents) for an uncluttered, focused reading view. This
fork adds a small visual cue for its active state.

It is **opt-in, not on by default**. The fork briefly defaulted it on, but that
was reverted: reader mode itself is great for focus, but with the navigation
hidden it was too subtle to discover how to get *back* to normal mode. So you
now turn it on deliberately rather than landing in it.

## Usage

Click the reader-mode toggle (in the left controls, next to dark-mode and
search) to collapse the side panels; click it again to bring all navigation
back. While reader mode is on, the toggle icon dims to half opacity as a subtle
"this is active" hint, and the side panels still fade back in on hover.

## Implementation

- `quartz/components/scripts/readermode.inline.ts` — the `isReaderMode` initial
  value stays `false` (opt-in). It was flipped to `true` in `3fb904c` to default
  the garden into reader mode, then reverted in `479dc1d` for the
  discoverability reason above; the `true` line is left commented as a toggle
  point. Note the state lives in this module variable (not localStorage), so it
  persists across in-site SPA navigation but resets on a full reload.
- `quartz/components/styles/readermode.scss` (`c9f3381`) — the toggle's `svg`
  is full opacity normally and `opacity: 0.5` under `:root[reader-mode="on"]`,
  so the icon visibly dims when reader mode is engaged.
- `quartz.layout.ts` — the `ReaderMode` toggle lives in the **content-page**
  layout (notes and posts). Listing pages (tags, folders, this `features/`
  index) deliberately omit it: those pages exist to navigate, where hiding the
  navigation makes no sense.
