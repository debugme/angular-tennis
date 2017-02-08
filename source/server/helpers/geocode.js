import axios from 'axios'
import moment from 'moment'

export default function (options, request, response, next) {
  const { country } = request.params
  const expiry = moment().add(...options.expiry).format('YYYY:MM:DD-HH:mm:ss (x)')
  const apiKey = options.apiKey
  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=country:${country}&key=${apiKey}`
  axios.get(url)
    .then((cargo) => {
      const location = cargo.data.results[0].geometry.location
      response.json({ country, location, expiry })
    })
    .catch(error => {
      response.status(400).send(error.toString())
    })
}