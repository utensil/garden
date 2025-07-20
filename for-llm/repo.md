# Repository Information

*Last updated: 2025-07-20*

## Project Overview

This is **Utensil's Digital Garden** built on **Quartz v4** - a static site generator for publishing digital gardens and notes as websites. Quartz transforms Markdown content into a connected knowledge base with features like backlinks, graph visualization, and search.

- **Project Name**: Utensil's Digital Garden (fork of Quartz v4)
- **Purpose**: Personal digital garden/knowledge base website
- **Technology**: TypeScript, Preact, Node.js >=22, npm >=10.9.2
- **Content**: Markdown files in `content/` directory
- **Output**: Static website published to GitHub Pages

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

### Development Workflow
- Use `just dev` for development with auto-rebuild on file changes
- Use `just build` to generate production build in `public/`
- Version control via `jj` (Jujutsu), not git

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