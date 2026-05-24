import path from "path"
import fs from "fs"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { Readable } from "stream"

type WriteOptions = {
  ctx: BuildCtx
  slug: FullSlug
  ext: `.${string}` | ""
  content: string | Buffer | Readable
}

export const write = async ({ ctx, slug, ext, content }: WriteOptions): Promise<FilePath> => {
  // Write HTML pages folder-style (foo/index.html) so hosts that only resolve
  // /foo -> /foo/index.html (e.g. tangled's sites server, which never tries
  // /foo.html) serve clean URLs. The slug itself is unchanged everywhere else
  // (links, folder/tag detection) — only the on-disk path is folder-style.
  // Special/already-folder pages stay flat: index, 404, and *.../index slugs.
  let outPath: string = slug + ext
  if (ext === ".html" && slug !== "index" && slug !== "404" && !slug.endsWith("/index")) {
    outPath = joinSegments(slug, "index" + ext)
  }
  const pathToPage = joinSegments(ctx.argv.output, outPath) as FilePath
  const dir = path.dirname(pathToPage)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(pathToPage, content)
  return pathToPage
}
