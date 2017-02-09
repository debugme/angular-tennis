
import express from 'express'

import options from './options.json'

import connectGeocode from './connectors/geocode'
import connectWeather from './connectors/weather'
import connectLogging from './connectors/logging'
import connectRouting from './connectors/routing'
import connectExpress from './connectors/express'

const config = { server: express(), ...options[process.env.NODE_ENV] }

connectWeather(config)
connectGeocode(config)
connectLogging(config)
connectRouting(config)
connectExpress(config)
