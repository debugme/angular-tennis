import express from 'express'
import dotenv from 'dotenv'

import connectContent from 'Content'
import connectMatches from 'Matches'
import connectGeocode from 'Geocode'
import connectWeather from 'Weather'
import connectLogging from 'Logging'
import connectRouting from 'Routing'
import connectExpress from 'Express'

dotenv.load()

const config = { server: express(), mode: process.env.NODE_ENV, port: process.env.PORT, geocodeApiKey: process.env.GEOCODE_API_KEY, weatherApiKey: process.env.WEATHER_API_KEY }

connectContent(config)
connectMatches(config)
connectGeocode(config)
connectWeather(config)
connectLogging(config)
connectRouting(config)
connectExpress(config)
