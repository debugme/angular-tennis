import axios from 'axios'
import moment from 'moment'

export default function (options, request, response, next) {
  const { country, city, units } = request.params
  const expiry = moment().add(...options.expiry).format('YYYY:MM:DD-HH:mm:ss (x)')
  const apiKey = options.apiKey
  const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&q=${city},${country}&units=${units}`
  axios.get(url)
    .then((cargo) => {
      const data = cargo.data
      response.json({ country, city, data, expiry})
    }).
    catch(error => {
      response.status(400).send(error.response.data.message)
    })
}