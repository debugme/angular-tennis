import axios from 'axios'
import { middleware } from 'apicache'
import moment from 'moment'

const weatherHelper = (config, request, response, next) => {

  const { apiKey, expire, notify } = config
  const { country, city, units } = request.params
  const expiry = moment().add(...expire).format('YYYY:MM:DD-HH:mm:ss (x)')
  const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&q=${city},${country}&units=metric`

  notify()

  axios.get(url)
    .then((cargo) => {
      const data = cargo.data
      response.json({ country, city, data, expiry })
    }).
    catch(error => {
      const message = error.toString()
      response.status(400).json({ message })
    })
}

const connectWeather = ({ server, mode, weatherApiKey }) => {

  const weatherExpire = (mode === 'production') ? [1, 'hour'] : [20, 'seconds']
  const weatherNotify = (mode === 'production') ? () => { } : () => console.log(`${moment().format('YYYY:MM:DD-HH:mm:ss - ')}Calling Weather API`)
  const weatherConfig = { apiKey: weatherApiKey, expire: weatherExpire, notify: weatherNotify }
  const weatherRoute = '/api/weather/:country/:city'
  const weatherCache = middleware(weatherExpire.join(' '), (request, response) => response.statusCode === 200)
  const weatherMiddle = weatherHelper.bind(this, weatherConfig)

  server.get(weatherRoute, weatherCache, weatherMiddle)
}

export default connectWeather