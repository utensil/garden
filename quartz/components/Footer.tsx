import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { joinSegments, pathToRoot } from "../util/path"
import deploymentScript from "./scripts/deployment.inline"

interface Options {
  links: Record<string, string>
  // Deployment-aware "Source" link: per-platform repo URLs, switched client-side
  // (see scripts/deployment.inline.ts) so it points at GitHub on github.io and
  // tangled on tngl.sh.
  source?: { github: string; tangled: string }
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}
    const source = opts?.source
    const featuresHref = joinSegments(pathToRoot(fileData.slug!), "features/")
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year} with{" "}
          <a href={featuresHref}>custom features</a>
        </p>
        <ul>
          {source && (
            <li>
              <a href={source.github} data-href-github={source.github} data-href-tangled={source.tangled}>
                Source
              </a>
            </li>
          )}
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  Footer.afterDOMLoaded = deploymentScript
  return Footer
}) satisfies QuartzComponentConstructor
