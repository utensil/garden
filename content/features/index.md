---
title: Custom features
tag: features
---

Notes on the custom features this Quartz fork adds, grouped by nature.

## Component

- [[features/iframe|Enhanced iframe]] — embed external content via frontmatter, component options, or raw HTML, with a header and "open in new tab" link.

## Content

- [[features/tag-system|Posts vs. notes tag system]] — tagged pages are "posts", untagged are "notes"; the home page shows recent posts and notes in two columns, and tag listings are sorted by page count.

## UI

- [[features/search|Search as a button]] — the search trigger is a compact icon button instead of a full input bar.
- [[features/reader-mode|Reader mode]] — opt-in focus view on notes/posts that hides the side panels, with a dimmed-icon active hint (default-on was tried then reverted).
- [[features/layout|Layout & spacing tweaks]] — tighter top spacing, regrouped sidebar controls, ToC/explorer placement, and code-block padding.

## Theme

- [[features/theme|Forest palette & no dark-mode flash]] — custom fonts and colours, a wider page, and flash-free iframes in dark mode.

## Markdown

- [[features/html-in-markdown|Raw HTML in Obsidian markdown]] — enables raw HTML inside `.md` content, the prerequisite for inline iframe embeds.

## Tooling

- [[features/tooling|just workflow]] — `just dev`/`build`/`sync`/`new` recipes for live preview, building, syncing, and creating jj-stamped notes.

## Hosting

- [[features/hosting|Hosting on tangled (clean URLs)]] — folder-style output and absolute base paths so one build serves on both GitHub Pages and tangled's no-redirect host.
- [[features/deployment-aware|Deployment-aware links]] — the footer Source link (and opt-in iframes) switch to the host you're on — GitHub on github.io, tangled on tngl.sh — decided at runtime.
