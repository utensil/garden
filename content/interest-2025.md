---
title: My interest shifts in 2025
date: 2025-09-10
tag: post
---

## Math era

In early 2024, I had written [My math interests in 2024](https://utensil.github.io/forest/uts-001R/). At that time, I believe I would pursue my math interest, by reading relevant books and papers, authoring Hugo blog posts, aiming to find a niche research area that might lead to publishing a conference paper before I turn 40 (2027).

In April, I believe I need to make some friends in local Lean formalization community, to have some joint effort on formalizing Clifford Algebras. That didn't work out, but I was quite actively involved in the discussions in the local Lean community. The discussions have broader topics, such as Philosophy and Algebraic geometry. I remained active until October, when my day job became extremely busy, also because of some dramas in the community.

That journey bears some fruits. I started using Forester to make math notes. First I'd written notes about Clifford Algebras when I was still waiting for a conclusion of my Spin group formalization PR to `mathlib4`. Then towards notes about Topos theory and Type theory, I had written only notes on Category theory, their preliminary.

The reading focus then shifted to Algebraic geometry, because someone in the community started reading related books and shared notes, and I started to feel the area approachable. I had bought a few books about AG for years, but I could not wrap my head around the research motivation. I started reading books, it seemed within reach to understand it by cross checking literature with AG in `mathlib4`. And I thought I would learn the basics, to contribute to the [FLT project](https://imperialcollegelondon.github.io/FLT/).

## Fragmented era

I didn't finish the notes on AG. Instead, reading about varieties made me interested in ray-marching implicit surfaces, especially for varieties with singularities. I had spent quite some time with shaders, and even compute shaders, which were both inaccessible to me before this.

During this period exploring shaders in Rust, I was influenced by ideas about monorepo. Then I put formal stuff together as project `formal-land`, and native stuff (including GPU stuff) together as project `native-land`, start adding more technical notes into my Forester notes as project `forest` (rather than just math notes). I started to believe that this trio will provide solid ground for my further research.

When my day job became extremely busy in October, these had become overwhelming to my time and energy. As noted in [Fragmented learning, no more](https://utensil.bearblog.dev/frag/): Since September, constant context switch had dominated me at work. My attention for learning, had inevitably become fragmented. I started to maintain a learning diary for these partial learning progress that might never become fruitful notes. That also had broken the Zen mode reading books and papers, my learning and writing became much more superficial.

## Terminal era

Then came an even bigger distraction, though a valuable one.

When I was working with Rust as part of project `native-land`, one annoying thing was that VS Code was very slow and heavy in resource consumption. I started evaluating GPU rendered native code editors. I started with Zed, but its features were incomplete. Then I moved on to Neovim inside GPU rendered terminal emulators, and settled on Ghostty written in Zig.

I was always with comfortable with CLI in terminals, but I didn't realize there is also a whole world of modern TUIs, and Neovim is just one of them. So I started trying out many CLIs and TUIs, to the extent that I wish to do everything inside terminal. Eventually, the code editor also switched to Helix, with much less configuration efforts, as it didn't have plugins.

All the little things I learn about using these CLIs and TUIs, I've noted them as `just` tasks and their comments. Around `just` tasks, configuration files, supporting scripts accumulated, just like a `dotfiles` projects. I justify this as a better way to record my technical TIL ("today I learn"), as I had always been a fan of literate programming. Unfortunately, `just` provides little support in this regard, I could only document with command themselves and their comments.

## Forester 5.x & Quartz

I had been using Forester 4.x, and Forester 5.x has many breaking changes. It discourages the extensive customization I made to Forester, and had regressions on the "features" that I made used of. The announcement about moving away from XML and XSLT have the danger of invalidating many of my notes, as they rely on heavy customization. I started the porting process but haven't finished it yet.

On the other hand, I need a few things from 5.x series. It supports LSP, which might make it possible to edit Forester markup in Helix. It supports external forest mounting or direct linking, for which I have a trick to create bi-directional links with my other sites. It supports RSS which is essential for blog posting. It also supports a new URL scheme so a note can be referenced as `note_id/` instead of `note_id.xml`.

I really need to finish the upgrade ASAP. I had already overcome many regressions, and even ported the query (mostly, except for one regression). I just need to handle the new URL scheme, so it has access to my custom js and css files.

## Agents era

2025 is the year of agents. DeepSeek moment made SoTA level agents accessible locally, enterprise had been motivated to use agents to improve efficiency. These 2 factors have influenced my spare time and my day job significantly.

I tried many local models on my M4 Pro series Mac Mini and MBP. Out of all tests, I prefer Qwen series, and it has nice VL models for multimodality.

But I also used the best models available via APIs, and Claude is really the sole winner.

For terminal agents, I settled on OpenCode as it's open-source, works really well, and it supports GitHub Copilot directly without proxies. Amp gave me the best experience but it's burning too fast. Amazon Q chat provides free access to the latest Claude 4, with a quota that I'm just too busy to use up.

Mostly, I used terminal agents to write many supporting scripts to organize my learning diary. Other attempts are shallow. But it does help here and there, as I no longer have access to a smooth GitHub Copilot completion after I started using Helix. Inside the editor, I type with my own mind, and some traditional auto-completion and spell checker. Outside the editor, I use terminal agents to generate code, then review back in the editor. I feel this is a better way to delegate, like working with humans, while working as a human.

Still, agent programming is very time-consuming to babysit, and I suffer brain-rot to an extent, that I became reluctant to write Rust, Zig, Lean code.

My day job also required me to apply agents to what my team was doing, and it's far from frictionless.

All these had consumed more time from me, and made me even less focused. The entry barrier had been greatly lowered, so I could easily decide to try something new, just like scrolling to next short video.

## RSS and open web

I was reading news about agents and other technical advances on social media, namely twitter. I was careful with what to click, bookmark, and like, so that the feed focused on math and tech. But it's just very inefficient to scroll and hope for entries that I would be interested in.

So I chose open-source NetNewsWire as my RSS reader, start collecting feeds from social media. After some time, I no longer need social media to discover news about math and tech.

I'll spend time to go over unread entries, star some, then organize the informative bit as my learning diary. One day it became too overwhelming, as I could not finish scrolling the unread entries, and could not finish organizing the starred entries, while I still need to explore some of them deeper, or work on my other interests.

Fearing missing something that I might be interested in, I was exhausted by RSS feed, and had no time and energy to do any real work. It's ironic that social media was supposed to waste more time, but I only used it to rest my mind, and I don't have a fixed source of information to consume.

Anyway, I'm still drowning in RSS feed, but have managed to use Raindrop to add tags, highlights, notes more effectively, and decided to drop keeping the learning diary from time to time.

(to be continued...then more on open web, selfhost, web)

