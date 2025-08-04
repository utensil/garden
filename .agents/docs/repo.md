# Repository Information

*Last updated: 2025-07-20*

## Project Overview

This is **Utensil's Digital Garden** built on **Quartz v4** - a static site generator for publishing digital gardens and notes as websites. Quartz transforms Markdown content into a connected knowledge base with features like backlinks, graph visualization, and search.

| Property | Value |
|----------|-------|
| **Project Name** | Utensil's Digital Garden (fork of Quartz v4) |
| **Purpose** | Personal digital garden/knowledge base website |
| **Technology** | TypeScript, Preact, Node.js >=22, npm >=10.9.2 |
| **Content Source** | Markdown files in `content/` directory |
| **Output** | Static website published to GitHub Pages |
| **Version Control** | Jujutsu (`jj`), not git |
| **Task Management** | Backlog.md CLI system |

## Build, Test & Utility Commands

### Core Commands (via justfile)
```bash
just build         # Build static site (npx quartz build)
just dev            # Development server with hot reload
just sync           # Sync to git with jj (version control)
```

### NPM Scripts  
```bash
npm run check       # TypeScript check + prettier format check
npm run format      # Auto-format code with prettier
npm run test        # Run test suite
npm run quartz      # Direct quartz CLI access
```

### Backlog Management
```bash
backlog task list --plain              # List all tasks
backlog task 1 --plain                 # View task details
backlog task create "Task Title"       # Create new task
backlog task edit 1 -s "Done"         # Update task status
```

### Development Workflow
1. Use `just dev` for development with auto-rebuild on file changes
2. Use `just build` to generate production build in `public/`
3. Use `just sync` for version control operations via jj
4. Use backlog commands to manage structured tasks

## Project Layout

| Directory/File | Purpose |
|----------------|---------|
| `content/` | 📝 Source markdown content and assets |
| `quartz/` | 🔧 Core Quartz framework code |
| `quartz/components/` | ⚛️ Preact UI components |
| `quartz/plugins/` | 🔌 Content transformation plugins |
| `public/` | 🌐 Generated static website (build output) |
| `backlog/` | 📋 Task management system |
| `for-llm/` | 🤖 Agent documentation and guidelines |
| `quartz.config.ts` | ⚙️ Main site configuration |
| `quartz.layout.ts` | 🎨 Layout and component arrangement |
| `justfile` | 🛠️ Build commands and workflow |

## Code Areas & Architecture

### Allowed Modification Areas
- **Content**: `content/` - Markdown files, images, posts
- **Configuration**: `quartz.config.ts`, `quartz.layout.ts`  
- **Custom Components**: `quartz/components/` (with caution)
- **Styles**: `quartz/styles/` and component-specific SCSS files
- **Plugins**: `quartz/plugins/transformers/` (existing ones)

### Off-Limits Areas (G-scope)
- **Core Build**: `quartz/build.ts`, `quartz/bootstrap-*.mjs`
- **CLI**: `quartz/cli/`
- **Core Processors**: `quartz/processors/`
- **Test Files**: `*.test.ts`
- **Config Files**: `package.json`, `tsconfig.json`

### Key Architecture Files
- `quartz.config.ts`: Site configuration, theme, plugins
- `quartz.layout.ts`: Component layout definitions
- `quartz/components/`: React-like Preact components
- `quartz/plugins/`: Transformers, filters, emitters
- `content/`: Source markdown content

## Coding Standards

### TypeScript Standards
- **Type Safety**: Strict TypeScript configuration
- **Components**: Preact functional components with TypeScript
- **Imports**: ES modules, relative imports for local files
- **Style**: Follow existing component patterns in `quartz/components/`

### Content Standards
- **Markdown**: Standard + Obsidian-flavored extensions
- **Frontmatter**: YAML frontmatter for metadata
- **Links**: Wikilinks `[[title]]` and standard markdown links
- **File Organization**: Hierarchical structure in `content/`

### Styling
- **SCSS**: Component-specific SCSS files in `quartz/components/styles/`
- **Themes**: Light/dark mode support required
- **Fonts**: Custom Google Fonts (Droid Sans Bold, Roboto Slab, Hack)
- **Colors**: Custom color scheme defined in `quartz.config.ts`

## File Patterns & Conventions

### Important Files
- `content/index.md`: Homepage content
- `content/**/*.md`: All content pages
- `quartz/components/*.tsx`: UI components  
- `quartz/components/styles/*.scss`: Component styles
- `quartz/plugins/transformers/*.ts`: Content transformers

### Generated Files (Don't Edit)
- `public/`: Generated static site
- `node_modules/`: Dependencies
- `.quartz-cache/`: Build cache

### Config Files
- `quartz.config.ts`: Main site configuration
- `quartz.layout.ts`: Layout and component arrangement
- `package.json`: Dependencies and scripts
- `justfile`: Build commands and workflow

## Development Notes

### Current Customizations
- Custom color scheme (warm light mode, cool dark mode)
- Custom fonts (Droid Sans Bold, Roboto Slab, Hack)
- Iframe component for embedded content
- Recent notes display on homepage
- Reader mode component

### Plugin Configuration
- **Transformers**: FrontMatter, ObsidianFM, GitHubFM, TableOfContents, Latex, IframeEmbed
- **Filters**: RemoveDrafts
- **Emitters**: ContentPage, FolderPage, TagPage, ContentIndex, CustomOgImages

### Performance Notes
- CustomOgImages can slow build time (currently enabled)
- Build uses esbuild and lightningcss for optimization
- Development server includes hot reload via chokidar

## Common Patterns

### Adding New Content
1. Create `.md` file in appropriate `content/` subdirectory
2. Include YAML frontmatter with title, date, tags
3. Use wikilinks `[[page]]` for internal references
4. Build automatically handles linking and indexing

### Component Development
1. Create `.tsx` in `quartz/components/`
2. Add corresponding `.scss` in `quartz/components/styles/`
3. Export from `quartz/components/index.ts`
4. Use in layout files or other components

### Plugin Extension
1. Extend existing transformers in `quartz/plugins/transformers/`
2. Follow existing plugin patterns and interfaces
3. Register in `quartz.config.ts` plugins array
4. Test with various content types

## Common Pitfalls

### Build Issues
- **CustomOgImages**: Can significantly slow build time - disable if not needed
- **Node/npm versions**: Requires Node.js >=22 and npm >=10.9.2 
- **Cache issues**: Clear `.quartz-cache/` if builds behave unexpectedly
- **Memory**: Large sites may need increased Node.js memory limits

### Content Issues  
- **Broken wikilinks**: Use exact case-sensitive page titles in `[[links]]`
- **Image paths**: Use relative paths from content root, not absolute paths
- **Frontmatter**: Invalid YAML syntax breaks page processing
- **File naming**: Avoid special characters in filenames (spaces OK)

### Development Workflow
- **Hot reload**: Changes to config files require full restart
- **jj vs git**: Don't use git commands - use jj or backlog sync
- **Plugin order**: Order matters in `quartz.config.ts` plugins array
- **Component imports**: Use relative imports for local files

## Key File & Pattern References

### Configuration Patterns
```typescript
// quartz.config.ts - Main configuration
const config: QuartzConfig = {
  configuration: { /* site settings */ },
  plugins: { 
    transformers: [ /* content processors */ ],
    filters: [ /* content filters */ ],
    emitters: [ /* output generators */ ]
  }
}
```

### Component Patterns
```typescript
// Component with QuartzComponentProps
export default function ComponentName(props: QuartzComponentProps) {
  return <div>Content</div>
}
ComponentName.displayName = "ComponentName"
```

### Content Frontmatter
```yaml
---
title: Page Title
date: 2025-07-20
tags: [tag1, tag2]
draft: false  # Optional: exclude from build
---
```

## 🌱 Digital Garden Specific

### Wikilink Patterns
- `[[Page Name]]` - Link to page by title
- `[[Page Name|Display Text]]` - Link with custom text  
- `[[folder/page]]` - Link to page in subfolder
- `![[image.png]]` - Embed image

### Graph View Features
- Backlinks automatically generated
- Graph visualization of page connections
- Tag-based clustering and filtering
- Search integration with full-text indexing

### Publishing Workflow
1. Write content in `content/` with markdown + frontmatter
2. Use `just dev` to preview locally with hot reload
3. Use `just build` to generate static site in `public/`
4. Commit changes with `jj` and sync to remote
5. GitHub Pages automatically deploys from `public/` directory