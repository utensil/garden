---
title: Reader mode by default
date: 2025-07-19
tag: features/ui
---

## Feature

Quartz ships a reader-mode toggle that hides the side panels (explorer, graph,
backlinks, table of contents) to give an uncluttered reading view. This fork
experimented with turning it on by default and adds a small visual cue so the
toggle's active state is obvious.

## Usage

Click the reader-mode toggle in the sidebar to collapse the side panels; click
again to bring them back. While reader mode is on, the toggle icon dims to half
opacity as a subtle "this is active" hint. The side panels still fade back in on
hover.

## Implementation

Two small changes, both surgical:

- `quartz/components/scripts/readermode.inline.ts` — the `isReaderMode` initial
  value. The original customization (`3fb904c`) flipped it to `true` to default
  the garden into reader mode, but `479dc1d` ("Default to reader mode doesn't
  work on mobile") reverted it back to `false`. The current source keeps the
  default `false`, with the `true` line left commented as a toggle point.
- `quartz/components/styles/readermode.scss` (`c9f3381`) — gives the toggle's
  `svg` full opacity normally and `opacity: 0.5` under
  `:root[reader-mode="on"]`, so the icon visibly dims when reader mode is
  engaged.
