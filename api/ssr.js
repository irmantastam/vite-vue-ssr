import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'path'
import 'dotenv/config'

const base = process.env.BASE || '/'

export default async function handler(req, res) {
  try {
    const url = req.url.replace(base, '')

    const template = await fs.readFile(path.join(process.cwd(), 'dist/client/index.html'), 'utf-8')
    const ssrManifest = await fs.readFile(
      path.join(process.cwd(), 'dist/client/.vite/ssr-manifest.json'),
      'utf-8'
    )
    const render = (await import(path.join(process.cwd(), 'dist/server/entry-server.js'))).render

    const [appHtml, preloadLinks] = await render(url, ssrManifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml ?? '')

    res.status(200).send(html)
  } catch (e) {
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
}
