
import express from 'express'

import options from 'Options'

import connectContent from 'Content'
import connectMatches from 'Matches'
import connectGeocode from 'Geocode'
import connectWeather from 'Weather'
import connectLogging from 'Logging'
import connectRouting from 'Routing'
import connectExpress from 'Express'

const config = { server: express(), ...options[process.env.NODE_ENV] }

connectContent(config)
connectMatches(config)
connectGeocode(config)
connectWeather(config)
connectLogging(config)
connectRouting(config)
connectExpress(config)
