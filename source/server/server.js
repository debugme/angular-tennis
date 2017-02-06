import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack.config.babel.js'
import TournamentData from './tournament.json'

const server = express()

const mode = process.env.NODE_ENV || 'development'

server.get('/tournament-data', (request, response) => response.json(TournamentData))

if (mode === 'production') {
  server.use(express.static('build/client'))
  server.get('*', (request, response) => response.sendFile('build/index.html'))
} else {
  const clientConfig = webpackConfig({NODE_ENV: mode})[0]
  server.use(webpackMiddleware(webpack(clientConfig)))
}

const port = process.env.PORT || 3002
const callback = console.log.bind(this, `server running on port ${port} in ${mode} mode`)
server.listen(port, callback)