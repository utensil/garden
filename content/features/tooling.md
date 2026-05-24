---
title: "just workflow"
date: 2025-07-19
tag: features/tooling
---

## Feature

A `justfile` captures the everyday garden chores as short recipes, so the build,
serve, sync, and note-creation steps are one command each. The dev server
hot-restarts when config, layout, or content changes, and new notes are stamped
with a [jj](https://jj-vcs.github.io/) change id for a stable, collision-free
filename.

## Usage

- `just dev` — live preview server that auto-restarts on changes to
  `quartz.config.ts`, `quartz.layout.ts`, or `content/`.
- `just build` — one-off static build (handy for agents debugging output).
- `just sync` — push the `v4` branch via jj.
- `just new "My title"` — create a new note in `content/notes/` named after a jj
  change id, pre-filled from `templates/notes.md` with the title and today's
  date.
- `just prep` — `npm i`.

## Implementation

- `justfile` — built up across several commits: `dev` started as
  `npx quartz build --serve` (`3625aaf`), then gained a `watchexec --restart`
  wrapper watching config (`4150472`) and later layout + content
  (`ab1c77d` adds `build`). `sync` runs `jj bs v4 -r @- && jj psb v4`
  (`93c0b31`). `new` (`d3adeb1`) ensures a non-empty working copy gets a fresh
  `jj new`, reads the short change id via
  `jj log -r @ -T 'change_id.short()'`, copies the template to
  `content/notes/<id>.md`, and `sed`-substitutes `TITLE`/`DATE`.
- `templates/notes.md` (`d3adeb1`) — the stamped frontmatter template
  (`title`, `date`, `tag: note`) the `new` recipe fills in.
