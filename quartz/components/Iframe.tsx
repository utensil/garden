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
    
    if (!iframeSrc) {
      return null
    }

    return (
      <div class={classNames(displayClass, "iframe-container")}>
        <iframe src={iframeSrc}></iframe>
      </div>
    )
  }

  Iframe.css = style
  return Iframe
}) satisfies QuartzComponentConstructor
