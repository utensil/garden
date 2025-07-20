import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 Quartz 4 Configuration

 See https://quartz.jzhao.xyz/configuration for more information.

 Fonts and colors are inspired by

 - https://notes.asterhu.com/
 - https://utensil.github.io/forest/

 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Utensil's Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "utensil.github.io/garden/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Droid Sans Bold", // default: Schibsted Grotesk
        body: "Roboto Slab", // default: Source Sans Pro
        code: "Hack", // default: IBM Plex Mono
      },
      colors: {
        lightMode: {
          light: "#fffcf9", // default: #faf8f8
          lightgray: "#f4eae2", // default: #e5e5e5
          gray: "#e0d4c3", // default: #b8b8b8
          darkgray: "#4e4e4e", // darkgray: "#918078", // default: #4e4e4e
          dark: "#2b2b2b", // dark: "#675c51", // default: #2b2b2b
          secondary: "#75b0b4", // default: #284b63
          tertiary: "#da8d8d", // default: #84a59d
          quaternary: "#75b499", // added
          highlight: "#8f9fa926", // default: rgba(143, 159, 169, 0.15)
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#151a1f", // light: "#4b4a4a", // default: #161618
          lightgray: "#393639", // lightgray: "#6d6c6c", // default: #393639
          gray: "#646464", // default: #646464
          darkgray: "#d4d4d4", // default: #d4d4d4
          dark: "#cbd1db", // default: #ebebec
          secondary: "#9dccd0", // default: #7b97aa
          tertiary: "#f1b3b3", // default: #84a59d
          quaternary: "#75b499", // added
          highlight: "#8f9fa940", // default: rgba(143, 159, 169, 0.15)
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
