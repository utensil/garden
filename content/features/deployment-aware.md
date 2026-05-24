---
title: Deployment-aware links
date: 2026-05-24
tag: features/hosting
---

## Feature

This garden is published as one static build to **two** hosts — GitHub Pages
(`utensil.github.io/garden`) and tangled (`utensil.tngl.sh/garden`). Some links
should point at the host you're actually on rather than a fixed one. The footer
**Source** link is the first user of this: when served from `github.io` it
points at the GitHub repo, and from `tngl.sh` at the tangled repo
(`tangled.org/…`).

Because the same files are served from both hosts, the choice can't be made at
build time — it's decided in the browser from the current hostname.

## Usage

The footer Source link switches automatically; nothing to do.

To make any other link or embed deployment-aware, give it per-platform
attributes and the runtime script fills in the right one:

```html
<!-- a link -->
<a href="…default…" data-href-github="…" data-href-tangled="…">Source</a>

<!-- an iframe (e.g. embedding the host-native blog/forest once they exist on tangled) -->
<iframe data-src-github="…" data-src-tangled="…"></iframe>
```

`document.documentElement` also gets a `data-platform="github|tangled"` attribute
you can target from CSS.

## Implementation

- `quartz/components/scripts/deployment.inline.ts` — runs on load and on every
  SPA `nav`: reads `window.location.hostname`, picks `tangled` for `*.tngl.sh`
  or `*.tngl.org` else `github`, sets `data-platform` on `<html>`, then rewrites every
  `a[data-href-github]`'s `href` and every `iframe[data-src-github]`'s `src` to
  the matching `data-*-{platform}` value.
- `quartz/components/Footer.tsx` — renders the Source link with both URLs
  (`data-href-github` / `data-href-tangled`, default = GitHub) and wires the
  script via `Footer.afterDOMLoaded`. (Also adds the "with custom features" link
  to the Quartz credit line, pointing at this folder via `pathToRoot`.)
- `quartz.layout.ts` — configures `Component.Footer({ source: { github, tangled } })`.

Builds on the absolute base-path URLs from [[features/hosting|Hosting on tangled]]
(the script only swaps opted-in links; everything else is already host-agnostic).
