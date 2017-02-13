import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../../webpack.config.babel.js'

function connectRouting({server, mode}) {

  if (mode === 'production') {
    const root = path.resolve('./build/client')
    server.use(express.static(root))
    server.get('/*', (request, response) => response.sendFile('index.html', { root }))
  } else {
    const clientConfig = webpackConfig({ mode })[0]
    server.use(webpackMiddleware(webpack(clientConfig)))
  }

}

export default connectRouting