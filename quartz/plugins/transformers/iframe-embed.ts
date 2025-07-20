import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { Element, Root as HtmlRoot } from "hast"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import { PluggableList } from "unified"

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
    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw]

      if (opts.enableIframeEmbed) {
        plugins.push(() => {
          return (tree: HtmlRoot, file) => {
            visit(tree, "element", (node: Element) => {
              if (node.tagName === "iframe") {
                // Extract src and style attributes
                const src = node.properties.src as string
                let styleObj: Record<string, string | number> = {}
                
                // Parse style attribute if it exists
                if (node.properties.style && typeof node.properties.style === "string") {
                  const styleStr = node.properties.style as string
                  const styleEntries = styleStr.split(';')
                    .filter(entry => entry.trim() !== '')
                    .map(entry => {
                      const [key, value] = entry.split(':').map(part => part.trim())
                      return [key, value]
                    })
                  
                  styleObj = Object.fromEntries(styleEntries)
                }
                
                // Store iframe data in file frontmatter for the Iframe component to use
                if (!file.data.frontmatter) {
                  file.data.frontmatter = {}
                }
                
                file.data.frontmatter.iframe = src
                file.data.frontmatter["iframe-style"] = styleObj
                
                // Replace the iframe with a div that will be rendered by the Iframe component
                node.tagName = "div"
                node.properties = {
                  ...node.properties,
                  class: "quartz-iframe",
                  "data-iframe-src": src,
                }
                
                // Clear children to ensure proper rendering
                node.children = []
              }
            })
          }
        })
      }

      return plugins
    },
    markdownPlugins() {
      return []
    },
  }
}

export default IframeEmbed
