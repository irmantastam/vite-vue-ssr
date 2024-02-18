import { handler } from '@api/handler'
import { endpoints } from '@api/routers'
import express from 'express'

const PORT = process.env.PORT || 5173
const server = express()
const assets = express.static('dist')

server.use(express.json())
server.use('/', assets)
server.use('/api', handler)
server.use('*', assets)
server.listen(PORT, () => {
  console.log(`Ready at http://localhost:${PORT}`)
})
