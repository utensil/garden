# Astro Migration Analysis

## Overview

This document analyzes the feasibility of migrating the Quartz static site generator to Astro, a modern static site framework. It covers Quartz’s current architecture, Astro’s capabilities (as of 2025), a high-level mapping of features and dependencies, and identifies key challenges and opportunities for migration.

---

## 1. Quartz Architecture & Dependencies

- **Type:** Static Site Generator (SSG)
- **Core Stack:** Node.js, TypeScript, Preact, unified/remark/rehype, custom plugin system
- **Key Features:**
  - Markdown-first content pipeline (remark, rehype, unified, vfile, etc.)
  - Static rendering via Preact (JSX/TSX, no hydration by default)
  - Plugin-based extensibility (filters, transformers, emitters)
  - Custom CLI and build pipeline (esbuild, worker threads, hot-reload server)
  - Asset pipeline (Sass, Lightning CSS, sharp, etc.)
  - Visualization (d3, pixi.js, satori), search (flexsearch), code highlighting (shiki), math (katex, mathjax)
- **Plugin System:** Custom, with hooks for content transformation, filtering, and file emission

---

## 2. Astro Capabilities (2025)

- **Rendering Model:** SSG by default, supports SSR and hybrid rendering
- **Component Support:** Native Astro components, plus React, Preact, Vue, Svelte, Solid, etc.
- **Markdown/MDX:** Built-in, with full support for remark/rehype plugins
- **Plugin Ecosystem:** Large, with official and community integrations for CSS, images, search, math, code highlighting, etc.
- **Asset Pipeline:** Built-in support for Sass, Lightning CSS, image optimization (sharp), static assets
- **Other Features:** Hot-reload dev server, file-based routing, data fetching at build time, extensibility via integrations and hooks

---

## 3. Feasibility of Migration

- **Content pipeline, Markdown, static rendering, and most UI features:** Easily portable to Astro
- **Visualization, search, and asset pipeline:** Mostly portable, with minor adjustments
- **Custom plugins, CLI, and advanced build logic:** Require significant rewrite or adaptation
- **No major blockers for a static site with Markdown, Preact, and standard plugins**
- **Key challenge:** Quartz’s custom plugin system is not directly compatible with Astro’s integration model

---

## 4. Key Challenges & Opportunities

### Challenges
- **Plugin Compatibility:** Quartz plugins are not directly portable; would require an adapter or rewrite as Astro integrations
- **Custom CLI/Build Logic:** Astro has its own CLI and build pipeline; custom commands and worker logic would need to be re-architected
- **Dynamic OG Image Generation:** May require custom endpoints or build scripts in Astro
- **Progressive Adoption:** Need a strategy to migrate incrementally without breaking existing plugins or requiring immediate rewrites

### Opportunities
- **Modern Ecosystem:** Astro’s plugin ecosystem covers most standard needs (Markdown, math, code, CSS, images, etc.)
- **Performance:** Astro’s islands architecture and static rendering can improve performance and reduce shipped JS
- **Developer Experience:** Astro’s file-based routing, hot-reload, and integrations can simplify development

---

## Next Steps

- Deep-dive into plugin compatibility and the feasibility of an adapter layer
- Develop a progressive adoption plan to minimize disruption and avoid breaking plugins
- Explore technical solutions for advanced features (CLI, build, OG images, etc.)

---

**See also:**
- [plugin-compatibility.md](./plugin-compatibility.md)
- [progressive-adoption.md](./progressive-adoption.md)
