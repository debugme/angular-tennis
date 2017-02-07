import axios from 'axios'

export default function (request, response, next) {
  const { country, city, units } = request.params
  const apiKey = request.app.locals.weatherApiKey
  const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&q=${city},${country}&units=${units}`
  axios.get(url)
    .then((cargo) => {
      const data = cargo.data
      response.json({ country, city, data})
    }).
    catch(error => {
      response.status(400).send(error.response.data.message)
    })
}