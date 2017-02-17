import express from 'express'
import path from 'path'

function connectRouting({server, mode}) {
  const root = path.resolve('./build/client')
  server.use(express.static(root))
  server.get('/', (request, response) => response.sendFile('index.html', { root }))
  server.get('*',function (req, res) {
    res.redirect('/');
  });
}

export default connectRouting
