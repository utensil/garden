---
title: Raw HTML in Obsidian markdown
date: 2025-07-20
tag: features/markdown
---

## Feature

Lets you drop raw HTML directly into Obsidian-flavoured markdown content and
have it rendered, rather than escaped or stripped. This is what makes
[[features/iframe|inline iframe embeds]] (and other hand-written HTML) work
inside `.md` files.

## Usage

Just write the HTML in your markdown:

```html
<iframe src="https://example.com" style="width: 100%; height: 500px;"></iframe>
```

It renders as-is. No fenced block, no escaping needed.

## Implementation

A one-line config flip in `quartz.config.ts` (`90e3836`): the
`ObsidianFlavoredMarkdown` transformer is initialised with
`enableInHtmlEmbed: true` (was `false`). This tells OFM to keep and process raw
HTML embedded in markdown, which downstream `rehype-raw` then parses — the
prerequisite for the iframe-embed transformer to find and rewrite `<iframe>`
tags.
