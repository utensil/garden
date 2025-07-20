---
title: iframe
tag: features/component
---

Quartz can embed external content using iframes based on a frontmatter property. You can add it to any layout by using `Component.Iframe` in `quartz.layout.ts`.

## Features

- Automatically embeds external content using an iframe
- Displays the source URL in a subtle header
- Provides a convenient "open in new tab" button
- Responsive design that works on all screen sizes
- Supports custom styling through the `iframe-style` frontmatter property
- Can be configured via component options or frontmatter

## Usage

### Via Frontmatter

Add an `iframe` property to your frontmatter with the URL you want to embed:

```yaml
---
title: My Page
iframe: https://example.com
---
```

The component will automatically render an iframe with the specified URL, along with a header showing the URL and an external link icon to open the content in a new tab.

### Via Component Options

When adding the component to your layout, you can specify the source URL and styles directly:

```typescript
Component.Iframe({
  src: "https://example.com",
  style: {
    height: "400px",
    border: "1px solid red"
  }
})
```

This is useful when you want to embed a specific iframe in a layout regardless of the page content.

### Priority Order

When both component options and frontmatter properties are provided:
1. Component options take precedence over frontmatter
2. Frontmatter values are used as fallbacks if component options are not provided

## Custom Styling

You can customize the styling of the iframe by adding an `iframe-style` property to your frontmatter:

```yaml
---
title: My Page
iframe: https://example.com
iframe-style:
  height: 300px
  border: 2px solid #3498db
  borderRadius: 8px
---
```

The `iframe-style` property accepts any valid CSS properties in camelCase format (like React inline styles).

## Customization

You can customize the default appearance of the iframe by modifying the styles in `quartz/components/styles/iframe.scss`.

Some aspects you might want to customize:
- The height of the iframe (default is 80vh)
- The border and border-radius
- The header appearance
- The colors and spacing

### Component Files

- Component: `quartz/components/Iframe.tsx`
- Style: `quartz/components/styles/iframe.scss`
