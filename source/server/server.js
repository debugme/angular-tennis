
import express from 'express'

import options from './options.json'

import connectContent from './connectors/content'
import connectMatches from './connectors/matches'
import connectGeocode from './connectors/geocode'
import connectWeather from './connectors/weather'
import connectLogging from './connectors/logging'
import connectRouting from './connectors/routing'
import connectExpress from './connectors/express'

const config = { server: express(), ...options[process.env.NODE_ENV] }

connectContent(config)
connectMatches(config)
connectGeocode(config)
connectWeather(config)
connectLogging(config)
connectRouting(config)
connectExpress(config)
