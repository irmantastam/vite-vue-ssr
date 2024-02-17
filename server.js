import { handler } from '@api/handler'
import { endpoints } from '@api/routers'
import express from 'express'

const PORT = 3000
const PUBLIC_DIR = 'dist'
const server = express()
const assets = express.static(PUBLIC_DIR)

server.use(express.json())
server.use('/', assets)
server.use('/api', handler)
server.use('*', assets)
server.listen(PORT, () => {
  console.log(`Ready at http://localhost:${PORT}`)
  console.log(endpoints)
})
