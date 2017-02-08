import { middleware as cache } from 'apicache'
import express from 'express'
import fs from 'fs'
import moment from 'moment'
import morgan from 'morgan'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

import geocode from './helpers/geocode'
import weather from './helpers/weather'
import webpackConfig from '../../webpack.config.babel.js'
import options from './options.json'

function setUpHelpers(server, { weatherApiKey, geocodeApiKey, mode }) {

  const weatherExpiry = (mode === 'production') ? [1, 'hour'] : [10, 'seconds']
  const geocodeExpiry = (mode === 'production') ? [1, 'week'] : [10, 'seconds']
  const weatherConfig = { apiKey: weatherApiKey, expiry: weatherExpiry}
  const geocodeConfig = { apiKey: geocodeApiKey, expiry: geocodeExpiry}

  const weatherRoute = '/api/weather/:country/:city/:units'
  const geocodeRoute = '/api/geocode/:country'
  const weatherCache = cache.bind(this, weatherExpiry.join(' '))
  const geocodeCache = cache.bind(this, geocodeExpiry.join(' '))
  const weatherHelper = weather.bind(this, weatherConfig)
  const geocodeHelper = geocode.bind(this, geocodeConfig)

  server.get(weatherRoute, weatherCache(), weatherHelper)
  server.get(geocodeRoute, geocodeCache(), geocodeHelper)

}

function setUpLogging(server, { mode }) {
  const logFile = path.resolve(`./logs/${mode}.${moment().format('YYYYMMDD')}.log`)
  var stream = fs.createWriteStream(logFile, {flags: 'a'})
  server.use(morgan('common', { stream }))
}

function setUpRouting(server, { mode }) {
  if (mode === 'production') {
    const root = path.resolve('./build/client')
    server.use(express.static(root))
    server.get('/*', (request, response) => response.sendFile('index.html', { root }))
  } else {
    const clientConfig = webpackConfig({mode})[0]
    server.use(webpackMiddleware(webpack(clientConfig)))
  }
}

function setUpServer(server, { mode, port }) {
  const message = `server running on port ${port} in ${mode} mode`
  const callback = console.log.bind(this, message)
  server.listen(port, callback)
}

const server = express()

const config = options[process.env.NODE_ENV]

setUpHelpers(server, config)
setUpLogging(server, config)
setUpRouting(server, config)
setUpServer(server, config)
