---
id: task-1
title: Draft repo.md
status: Done
assignee: []
created_date: '2025-07-20'
updated_date: '2025-07-20'
labels: []
dependencies: []
---

## Description

Use your tools to learn about what is this repo about, and draft for-llm/repo.md , make it concise and useful for you, leave information that's not helpful to you as an agent out, particularly, there should be sections mentioned by AGENTS.md , you may learn something from justfile, and root ts files, and content directory.

## Execution Notes

### Key Findings During Task
- **Repository Type**: Quartz v4-based digital garden (static site generator)
- **Version Control**: Uses Jujutsu (`jj`) instead of git - critical for agents to know
- **Task Management**: Structured backlog system with CLI tool (`backlog task edit`, etc.)
- **Build System**: `just` commands for workflow, npm scripts for development
- **Technology Stack**: TypeScript + Preact + Node.js >=22 + npm >=10.9.2

### Reference Structure Analysis
- **Primary Reference**: Analyzed forest repository's for-llm/repo.md structure via WebFetch from https://github.com/utensil/forest/raw/refs/heads/main/for-llm/repo.md
- Applied hierarchical organization patterns: general→specific, setup→usage→advanced
- Adopted table-based project layout with emojis for visual clarity
- Learned structural patterns: command reference sections, directory tables, clear subsection hierarchy
- Included comprehensive "Common Pitfalls" section to prevent errors
- Added code pattern references for quick lookup
- **Key Insight**: Forest repo used consistent header hierarchy, code blocks for commands, tables for structured info

### AGENTS.md Compliance
- Followed sections mentioned in AGENTS.md requirements
- Added build commands section (G-verify compliance)
- Included code area boundaries (G-scope compliance)  
- Added coding standards (G-lint compliance)
- Structured for agent workflow support

### Extra Context for Future Tasks
- **Performance Note**: CustomOgImages plugin slows builds significantly
- **Memory Requirements**: Large sites may need Node.js memory limit increases
- **Hot Reload Limitation**: Config file changes require full restart
- **Plugin Order**: Matters in quartz.config.ts - affects content processing
- **Content Linking**: Wikilinks are case-sensitive, must match exact page titles

### Implementation Approach
1. Created comprehensive project overview table for quick reference
2. Added backlog CLI commands section for task management integration
3. Structured project layout table with directory purposes and emojis
4. Expanded common pitfalls based on Quartz-specific issues
5. Added digital garden specific guidance (wikilinks, graph features)
6. Included code patterns and configuration examples

### Files Modified
- Created `/Users/utensil/projects/garden/for-llm/repo.md` (240 lines)
- Enhanced structure based on forest repository patterns
- Committed with proper [AGENT] tag following G-commit guidelines
