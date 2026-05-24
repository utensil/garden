---
title: Hosting on tangled (clean URLs)
date: 2026-05-24
tag: features/hosting
---

## Feature

The garden's source is hosted on **both** GitHub and
[tangled](https://tangled.org) (`tangled.org/utensil.tngl.sh/garden`) — two equal
source repos, each deployed to its own URL: `utensil.github.io/garden` (GitHub
Pages) and `utensil.tngl.sh/garden` (tangled's Cloudflare-worker "sites" service;
tangled is migrating `.sh`→`.org`, with `.sh` redirecting). tangled's host has
two quirks that broke a stock Quartz build:

- It resolves `/foo` → `/foo/index.html` only — it never tries `/foo.html`.
- It serves the no-trailing-slash URL (`/foo`) directly, **without** redirecting
  to `/foo/`.

Quartz emits flat `foo.html` files with *relative* asset/link paths. On tangled
that meant every page 404'd, and once a page did resolve, its relative `../..`
paths were computed one level too high, so assets failed and pages rendered
unstyled. Three surgical fixes make the *same* build serve correctly on both
GitHub Pages and tangled.

## Usage

Essentially transparent: one `quartz build` produces output that works on both
hosts. GitHub Pages already worked because it 301-redirects `/foo` → `/foo/`; the
absolute-path fix is what additionally satisfies tangled's no-redirect host.

## Implementation

Three fixes, each scoped to one mechanism:

- **Folder-style output** — `quartz/plugins/emitters/helpers.ts` `write()` emits
  HTML as `foo/index.html` instead of `foo.html`, so `/foo → /foo/index.html`
  resolves on tangled. Guards keep `index`, `404`, and any `*/index` slug flat.
  Crucially this is done at the *write* step, not the slug: an earlier attempt
  that slugged pages as `foo/index` made Quartz treat every page as a folder
  (spurious "0 items under this folder") and broke tag pages, so that was
  reverted (`de329b1`).
- **Absolute base URLs** — `setBasePath(cfg.configuration.baseUrl)` in
  `quartz/build.ts` derives the base path (`/garden`) once, and `pathToRoot()`
  in `quartz/util/path.ts` returns that absolute base instead of a relative
  `../..`, falling back to the relative form for root deploys. Absolute URLs are
  immune to the trailing-slash inconsistency. (`pathToRoot` is server-side
  only.) (`4621eca`)
- **Inline tag links** — `quartz/plugins/transformers/ofm.ts` built inline
  `#tag` hrefs as `pathToRoot + /tags/<tag>`, which `CrawlLinks` then
  re-resolved, doubling the base (`/garden/garden/tags/…`). It now emits the
  vault-relative `tags/<tag>` and lets `CrawlLinks` resolve it once, like a
  wikilink. (`371074d`)
