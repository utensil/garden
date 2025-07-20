---
title: iframe
tags: component
iframe: https://example.com
---

Quartz can embed external content using iframes based on a frontmatter property. You can add it to any layout by using `Component.Iframe` in `quartz.layout.ts`.

This page demonstrates the Iframe component. The iframe above should be displaying content from example.com.

## Usage

Add an `iframe` property to your frontmatter with the URL you want to embed:

```yaml
---
title: My Page
iframe: https://example.com
---
```

The component will automatically render an iframe with the specified URL.

## Customization

You can customize the appearance of the iframe by modifying the styles in `quartz/components/styles/iframe.scss`.

- Component: `quartz/components/Iframe.tsx`
- Style: `quartz/components/styles/iframe.scss`
