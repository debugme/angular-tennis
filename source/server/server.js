import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack.config.babel.js'
import weatherMiddleware from './middleware/weather'
import geocodeMiddleware from './middleware/geocode'
import { middleware as cache } from 'apicache'

const server = express()

server.locals.weatherApiKey = process.env.WEATHER_API_KEY
server.locals.geocodeApiKey = process.env.GEOCODE_API_KEY

server.get('/api/weather/:country/:city/:units', cache('1 hour'), weatherMiddleware)
server.get('/api/geocode/:country/', cache('1 hour'), geocodeMiddleware)

const mode = process.env.NODE_ENV || 'development'

if (mode === 'production') {
  const root = path.resolve('./build/client')
  server.use(express.static(root))
  server.get('/*', (request, response) => response.sendFile('index.html', { root }))
} else {
  const clientConfig = webpackConfig({NODE_ENV: mode})[0]
  server.use(webpackMiddleware(webpack(clientConfig)))
}

const port = process.env.PORT || 3002
const callback = console.log.bind(this, `server running on port ${port} in ${mode} mode`)
server.listen(port, callback)