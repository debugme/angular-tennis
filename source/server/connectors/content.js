import axios from 'axios'
import moment from 'moment'

const getMatchesData = host =>
  axios.get(`http://${host}/api/matches`)

const getGeocodeData = (host, {location}) =>
  axios.get(`http://${host}/api/geocode/${location}`)

const getWeatherData = (host, {location, city}) =>
  axios.get(`http://${host}/api/weather/${location}/${city}`)

const buildRow = (host, matchesData) =>
  axios
    .all([getGeocodeData(host, matchesData), getWeatherData(host, matchesData)])
    .then(axios.spread((geocodeData, weatherData) => Promise.resolve(matchesData, geocodeData.data, weatherData.data)))

const buildTable = (host, response, cargo) =>
  axios
    .all(cargo.data.matches.map(matchesData => buildRow(host, matchesData)))
    .then(tableData => response.json(tableData))

const contentHelper = (request, response, next) =>
    getMatchesData(request.headers.host)
      .then(buildTable.bind(this, request.headers.host, response))

function connectContent({server}) {
  server.get('/api/content', contentHelper)
}

export default connectContent