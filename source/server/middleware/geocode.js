import axios from 'axios'

export default function (request, response, next) {
  const { country } = request.params
  const apiKey = request.app.locals.geocodeApiKey
  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=country:${country}&key=${apiKey}`
  axios.get(url)
    .then((cargo) => {
      const location = cargo.data.results[0].geometry.location
      response.json({ country, location })
      next()
    })
    .catch(error => {
      response.status(400).send(error.toString())
    })
}