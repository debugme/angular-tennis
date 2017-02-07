import axios from 'axios'

export default function (request, response) {
  const { country, city, units } = request.params
  const apiKey = request.app.locals.weatherApiKey
  const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&q=${city},${country}&units=${units}`
  axios.get(url).then(({data}) => response.json({ country, city, data}))
}