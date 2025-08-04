# Plugin Compatibility: Quartz vs. Astro

## 1. Overview

This document analyzes the compatibility between Quartz’s plugin system and Astro’s integration model, with a focus on the feasibility of an adapter layer to minimize plugin rewrites during migration.

---

## 2. Quartz Plugin System

- **Types of Plugins:**  
  - Filters: Remove or transform content before emission
  - Transformers: Modify Markdown or HTML ASTs (mdast/hast)
  - Emitters: Output files (HTML, assets, etc.)
- **API Surface:**  
  - Plugins receive and mutate content objects, ASTs, or file data
  - Can hook into various stages: text, Markdown, HTML, emission
  - Plugins are registered in config and executed in sequence
- **Extensibility:**  
  - Highly flexible, but tightly coupled to Quartz’s unified-based pipeline and custom build process

---

## 3. Astro Integration Model

- **Types of Integrations:**  
  - Remark/Rehype plugins for Markdown/MDX
  - Astro Integrations: Plugins that hook into build, dev, SSR, etc.
  - Component-level extensions (React, Preact, etc.)
- **API Surface:**  
  - Remark/Rehype plugins: Standard unified API
  - Integrations: Lifecycle hooks (setup, build, server, etc.)
  - Limited direct access to file emission or custom build steps (compared to Quartz)
- **Extensibility:**  
  - Designed for composability and standardization, but less granular than Quartz’s plugin hooks

---

## 4. Feasibility of a Plugin Adapter

### a. Direct Portability
- **Remark/Rehype Plugins:**  
  - Quartz plugins that operate on Markdown/HTML ASTs and follow unified conventions can be ported directly to Astro as remark/rehype plugins.
- **Custom Filters/Emitters:**  
  - Plugins that depend on Quartz’s custom content objects, file emission, or build pipeline are not directly portable.

### b. Adapter Layer Design
- **Concept:**  
  - Create an adapter that wraps Quartz plugins and exposes them as Astro integrations or remark/rehype plugins.
- **Approach:**  
  - For AST-based plugins: Provide a compatibility wrapper that adapts plugin signatures to unified’s API.
  - For file emission or build-step plugins: Implement a custom Astro integration that mimics Quartz’s plugin lifecycle, possibly by running Quartz’s pipeline as a sub-process or library.
- **Risks:**  
  - Performance overhead from double-pipelining
  - Maintenance burden of keeping the adapter in sync with both systems
  - Not all plugin types are adaptable (especially those tightly coupled to Quartz’s build logic)

### c. Recommended Path
- **Short-term:**  
  - Port remark/rehype-compatible plugins directly
  - Use an adapter for simple filters/transformers where feasible
- **Long-term:**  
  - Gradually rewrite complex plugins as native Astro integrations or scripts

---

## 5. Risks and Limitations

- **API Mismatch:** Not all Quartz plugin hooks have direct equivalents in Astro
- **Performance:** Adapter may introduce build-time overhead
- **Maintenance:** Adapter layer adds complexity and may require ongoing updates
- **Feature Gaps:** Some advanced plugins may not be portable without significant rewrite

---

## 6. Conclusion

- **Most remark/rehype plugins are portable with minimal changes**
- **Custom filters/emitters may require an adapter or rewrite**
- **A plugin adapter is feasible for simple cases, but not a long-term solution for all plugins**
