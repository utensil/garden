# Progressive Adoption Plan: Quartz → Astro

## 1. Overview

This document outlines a step-by-step plan for migrating from Quartz to Astro, with a focus on minimizing disruption, supporting incremental adoption, and avoiding plugin breakage or rewrites wherever possible.

---

## 2. Principles

- **Incremental Migration:** Move features and content in stages, not all at once.
- **Dual Build Support:** Allow both Quartz and Astro builds to coexist during transition.
- **Plugin Preservation:** Use adapters or wrappers to keep existing plugins working as long as possible.
- **Fallbacks:** Always have a working build at each stage.

---

## 3. Migration Stages

### Stage 1: Prepare for Migration

- Audit all plugins and custom build steps.
- Identify which plugins are remark/rehype-compatible and which are Quartz-specific.
- Modularize content and components to ease extraction.

### Stage 2: Astro Proof-of-Concept

- Set up a parallel Astro project with minimal config.
- Port a small subset of content (e.g., a few Markdown pages) and static assets.
- Integrate remark/rehype plugins that are directly portable.

### Stage 3: Dual Build Pipeline

- Maintain both Quartz and Astro build scripts.
- Use symlinks or shared content directories to avoid duplication.
- Gradually port UI components (Preact/JSX) to Astro, using Astro’s Preact support.

### Stage 4: Plugin Adapter Layer

- Implement an adapter for simple Quartz plugins (especially remark/rehype-based).
- For complex plugins, provide a compatibility wrapper or fallback to Quartz build for those features.
- Document which plugins are fully supported, partially supported, or require rewrite.

### Stage 5: Incremental Feature Migration

- Move visualization, search, and asset pipeline features to Astro equivalents.
- For features not natively supported by Astro, use custom integrations or scripts.
- Migrate custom CLI/build logic as npm scripts or Astro integrations.

### Stage 6: Final Cutover

- When all critical features and plugins are supported in Astro, deprecate the Quartz build.
- Remove adapter layer and legacy code.
- Fully adopt Astro’s build, routing, and plugin ecosystem.

---

## 4. Strategies to Avoid Breaking Plugins

- Use adapters/wrappers for remark/rehype plugins.
- For non-portable plugins, run Quartz as a sub-process for those build steps.
- Maintain clear documentation of plugin compatibility status.
- Encourage plugin authors to provide both Quartz and Astro versions where feasible.

---

## 5. Decision Points & Fallbacks

- If a plugin cannot be adapted, keep using Quartz for that feature until a rewrite is feasible.
- If Astro’s ecosystem lacks a needed feature, contribute an integration or maintain a custom script.
- Always ensure a working build at each migration stage.

---

## 6. Summary

- Migration can be progressive and non-breaking with careful planning.
- Most content and remark/rehype plugins are portable.
- Custom plugins and build logic require more effort, but adapters and dual builds can ease the transition.
