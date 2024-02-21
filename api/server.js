import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'path'
import 'dotenv/config'

const isProduction = process.env.NODE_ENV === 'production'
const base = process.env.BASE || '/'

export default async function handler(req, res) {
  try {
    const url = req.url.replace(base, '')

    let templateHtml
    let ssrManifest
    let render

    if (isProduction) {
      templateHtml = await fs.readFile(path.join(process.cwd(), 'dist/client/index.html'), 'utf-8')
      ssrManifest = await fs.readFile(
        path.join(process.cwd(), 'dist/client/.vite/ssr-manifest.json'),
        'utf-8'
      )
      render = (await import(path.join(process.cwd(), 'dist/server/entry-server.js'))).render
    } else {
      const { createServer } = await import('vite')

      const vite = await createServer({
        server: {
          middlewareMode: true
        },
        appType: 'custom',
        base
      })

      templateHtml = await fs.readFile(path.join(process.cwd(), 'index.html'), 'utf-8')
      templateHtml = await vite.transformIndexHtml(url, templateHtml)
      ssrManifest = {}

      render = (await vite.ssrLoadModule('./src/entry-server.js')).render
    }

    const [appHtml, preloadLinks] = await render(url, ssrManifest)

    const html = templateHtml
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml ?? '')

    res.status(200).send(html)
  } catch (e) {
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
}
