import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { Element, Root as HtmlRoot } from "hast"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import { PluggableList } from "unified"
import { SKIP } from "unist-util-visit"

export interface Options {
  enableIframeEmbed: boolean
}

const defaultOptions: Options = {
  enableIframeEmbed: true,
}

export const IframeEmbed: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "IframeEmbed",
    markdownPlugins() {
      return []
    },
    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw]

      if (opts.enableIframeEmbed) {
        plugins.push(() => {
          return (tree: HtmlRoot) => {
            visit(tree, "element", (node: Element) => {
              if (node.tagName === "iframe") {
                // Extract src and style attributes
                const src = node.properties.src as string
                if (!src) return // Skip iframes without src
                
                let styleObj: Record<string, string> = {}
                
                // Parse style attribute if it exists
                if (node.properties.style && typeof node.properties.style === "string") {
                  const styleStr = node.properties.style as string
                  styleStr.split(';').forEach(style => {
                    if (style.trim()) {
                      const [key, value] = style.split(':').map(s => s.trim())
                      if (key && value) {
                        // Convert kebab-case to camelCase for React style object
                        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
                        styleObj[camelKey] = value
                      }
                    }
                  })
                  
                  // Remove any border-radius from the iframe itself
                  delete styleObj.borderRadius
                }
                
                // Set default height if not specified
                if (!styleObj.height) {
                  styleObj.height = "500px"
                }
                
                // Create the iframe container structure
                const iframeContainer: Element = {
                  type: "element",
                  tagName: "div",
                  properties: {
                    className: ["iframe-container"]
                  },
                  children: [
                    // Header with URL and external link
                    {
                      type: "element",
                      tagName: "div",
                      properties: {
                        className: ["iframe-header"]
                      },
                      children: [
                        // URL span
                        {
                          type: "element",
                          tagName: "span",
                          properties: {
                            className: ["iframe-url"]
                          },
                          children: [
                            {
                              type: "text",
                              value: src
                            }
                          ]
                        },
                        // External link
                        {
                          type: "element",
                          tagName: "a",
                          properties: {
                            href: src,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: ["iframe-external-link"],
                            title: "Open in new tab"
                          },
                          children: [
                            {
                              type: "element",
                              tagName: "svg",
                              properties: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: 16,
                                height: 16,
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                              },
                              children: [
                                {
                                  type: "element",
                                  tagName: "path",
                                  properties: {
                                    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                  },
                                  children: []
                                },
                                {
                                  type: "element",
                                  tagName: "polyline",
                                  properties: {
                                    points: "15 3 21 3 21 9"
                                  },
                                  children: []
                                },
                                {
                                  type: "element",
                                  tagName: "line",
                                  properties: {
                                    x1: 10,
                                    y1: 14,
                                    x2: 21,
                                    y2: 3
                                  },
                                  children: []
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    // The iframe itself
                    {
                      type: "element",
                      tagName: "iframe",
                      properties: {
                        src,
                        style: styleObj,
                        border: 0,
                        loading: "lazy"
                      },
                      children: []
                    }
                  ]
                }
                
                // Replace the original node with our container
                Object.assign(node, iframeContainer)
                return SKIP
              }
            })
          }
        })
      }

      return plugins
    }
  }
}

export default IframeEmbed
