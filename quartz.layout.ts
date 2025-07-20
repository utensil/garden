import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.Flex({
        components: [
          {
            Component: Component.RecentNotes({
                title: "Recent posts",
                limit: 5,
                filter: (f) => f.slug !== "index" && (f.frontmatter?.tags?.includes("post") ?? false),
                showTags: false
            }),
            align: "start",
            grow: true
          },
          {
            Component: Component.RecentNotes({
                title: "Recent notes",
                limit: 5,
                filter: (f) => f.slug !== "index" && !f.frontmatter?.tags?.includes("post")
              }),
            align: "start",
            grow: true
          },
        ]
      })
    })
  ],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/jackyzha0/quartz",
      Source: "https://github.com/utensil/quartz",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.Iframe(),
  ],
  left: [
    // Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
        {
          Component: Component.Search(),
          // grow: true,
        },
      ],
    }),
    Component.MobileOnly(Component.Explorer()),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Backlinks(),
    Component.Graph(),
    Component.DesktopOnly(Component.Explorer()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta(), Component.Iframe()],
  left: [
    // Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          // grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.MobileOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.Explorer()),
  ],
}
