import express from 'express'
import path from 'path'

const connectRouting = ({server, mode}) => {
  const root = path.resolve('./build/client')
  server.use(express.static(root))
  server.get('/', (request, response) => response.sendFile('index.html', { root }))
  server.get('*', (req, res) => res.redirect('/'))
}

export default connectRouting
