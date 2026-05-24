// Deployment-aware attribution: the same static build is served from multiple
// hosts (GitHub Pages and tangled), so we pick host-specific URLs at runtime.
// Elements opt in via data-*-github / data-*-tangled attributes:
//   <a   data-href-github="…" data-href-tangled="…">
//   <iframe data-src-github="…" data-src-tangled="…">
function platformFor(host: string): "tangled" | "github" {
  // tangled is migrating tngl.sh → tngl.org; match both.
  return host.endsWith("tngl.sh") || host.endsWith("tngl.org") ? "tangled" : "github"
}

function applyDeployment() {
  const platform = platformFor(window.location.hostname)
  document.documentElement.setAttribute("data-platform", platform)

  document.querySelectorAll<HTMLAnchorElement>("a[data-href-github]").forEach((a) => {
    const url = a.getAttribute(`data-href-${platform}`)
    if (url) a.setAttribute("href", url)
  })

  document.querySelectorAll<HTMLIFrameElement>("iframe[data-src-github]").forEach((f) => {
    const src = f.getAttribute(`data-src-${platform}`)
    if (src && f.getAttribute("src") !== src) f.setAttribute("src", src)
  })
}

applyDeployment()
document.addEventListener("nav", applyDeployment)
