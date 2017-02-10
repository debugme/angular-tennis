import axios from 'axios'
import { middleware } from 'apicache'
import moment from 'moment'

function geocodeHelper(config, request, response, next) {
  const { apiKey, expire, notify } = config
  const { country } = request.params
  const expiry = moment().add(...expire).format('YYYY:MM:DD-HH:mm:ss (x)')
  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=country:${country}&key=${apiKey}`
  notify()
  axios.get(url)
    .then((cargo) => {
      const location = cargo.data.results[0].geometry.location
      response.json({ country, location, expiry })
    })
    .catch(error => {
      const message = error.toString()
      response.status(400).json({message})
    })
}

function connectGeocode({server, mode, geocodeApiKey}) {
  const geocodeExpire = (mode === 'production') ? [1, 'week'] : [10, 'seconds']
  const geocodeNotify = (mode === 'production') ? () => {} : () => console.log(`${moment().format('YYYY:MM:DD-HH:mm:ss - ')}Calling Geocode API`)
  const geocodeConfig = { apiKey: geocodeApiKey, expire: geocodeExpire, notify: geocodeNotify}
  const geocodeRoute = '/api/geocode/:country'
  const geocodeCache = middleware.bind(this, geocodeExpire.join(' '), ({statusCode}) => statusCode === 200)()
  const geocodeMiddle = geocodeHelper.bind(this, geocodeConfig)
  server.get(geocodeRoute, geocodeCache, geocodeMiddle)
}

export default connectGeocode