import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/iframe.scss"
import { classNames } from "../util/lang"

interface Options {
  // No options needed for now, but could add height, etc. in the future
}

export default ((userOpts?: Partial<Options>) => {
  const Iframe: QuartzComponent = ({
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    const iframeSrc = fileData.frontmatter?.iframe
    
    // Handle iframe-style as either an object or a string
    let iframeStyle = {}
    const customStyle = fileData.frontmatter?.["iframe-style"]
    
    if (customStyle && typeof customStyle === 'object') {
      iframeStyle = customStyle
    }
    
    if (!iframeSrc) {
      return null
    }

    return (
      <div class={classNames(displayClass, "iframe-container")}>
        <div class="iframe-header">
          <span class="iframe-url">{iframeSrc}</span>
          <a href={iframeSrc} target="_blank" rel="noopener noreferrer" class="iframe-external-link" title="Open in new tab">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
        <iframe src={iframeSrc} style={iframeStyle}></iframe>
      </div>
    )
  }

  Iframe.css = style
  return Iframe
}) satisfies QuartzComponentConstructor
