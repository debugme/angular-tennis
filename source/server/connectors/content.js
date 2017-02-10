import axios from 'axios'
import moment from 'moment'

const getMatches = host =>
  axios.get(`http://${host}/api/matches`)

const getGeocode = (host, {location}) =>
  axios.get(`http://${host}/api/geocode/${location}`)

const getWeather = (host, {location, city}) =>
  axios.get(`http://${host}/api/weather/${location}/${city}`)

const makeRecord = (matches, geocode, weather) =>
  Promise.resolve({ matches, geocode, weather })

function connectContent({server, mode}) {

  server.get('/api/content', (request, response, next) => {
    const { host } = request.headers
    getMatches(host)
      .then(({data}) => {
        axios.all(data.matches.map((matchesData) =>
          axios
            .all([getGeocode(host, matchesData), getWeather(host, matchesData)])
            .then(axios.spread((geocodeData, weatherData) =>
              makeRecord(matchesData, geocodeData.data, weatherData.data)
            ))
        ))
        .then((mergedData) =>
          response.json(mergedData)
        )
      })
  })
}

export default connectContent