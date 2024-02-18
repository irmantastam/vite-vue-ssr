import { handler } from '@api/handler'
import process from 'node:process'
import express from 'express'
import sirv from 'sirv'

const PORT = process.env.PORT || 5173
const base = process.env.BASE || '/'

const server = express()
const assets = sirv('./dist')

server.use('/api', handler)
server.use(base, assets)
server.use('*', assets)

server.listen(PORT, () => {
  console.log(`Ready at http://localhost:${PORT}`)
})
