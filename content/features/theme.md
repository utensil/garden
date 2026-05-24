---
title: "Theme: forest palette & no dark-mode flash"
date: 2025-07-19
tag: features/theme
---

## Feature

A custom visual identity for the garden, with fonts and a colour palette
inspired by the author's [forest](https://utensil.github.io/forest/) and
[notes.asterhu.com](https://notes.asterhu.com/). Warm off-white light mode, a
cool dark mode, teal/coral accent colours, and a wider content area than stock
Quartz. Embedded iframes also avoid a jarring white flash in dark mode.

## Usage

Transparent — the theme applies site-wide. Dark/light is toggled with the usual
sidebar control.

## Implementation

- `quartz.config.ts` (`3fb904c`, `8390523`) — sets `pageTitle`, swaps
  typography (header `Droid Sans Bold`, body `Roboto Slab`, code `Hack`), and
  retunes both the light- and dark-mode colour maps (warmer light neutrals,
  teal `secondary`, coral `tertiary`, an added `quaternary` green). Original
  Quartz values are kept inline as comments. The initial commit also rewrites
  the welcome `index.md` and the footer link.
- `quartz/styles/custom.scss` (`3fb904c`) — `.page { max-width: unset }` to
  widen the layout beyond Quartz's default page width.
- `quartz/components/styles/iframe.scss` (`a884551`) — gives the iframe
  `background-color: transparent` (plus `border-radius: 0` and a tall default
  height) so dark-mode pages don't flash white while an embed loads.
