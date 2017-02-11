import axios from 'axios'
import moment from 'moment'
import { get } from 'lodash'

const getMatches = host =>
  axios.get(`http://${host}/api/matches`)

const getGeocode = (host, {location}) =>
  axios.get(`http://${host}/api/geocode/${encodeURIComponent(location)}`)

const getWeather = (host, {location, city}) =>
  axios.get(`http://${host}/api/weather/${encodeURIComponent(location)}/${encodeURIComponent(city)}`)

const makeRecord = (matches, geocode, weather) =>
  Promise.resolve({ matches, geocode, weather })

const formatData = rawData => {
  const names = [
    'Tournament',
    'Status',
    'StartDate',
    'EndDate',
    'Surface',
    'Environment',
    'City',
    'Country',
    'Weather',
    'Temperature',
    'Pressure'
  ]
  const paths = [
    'matches.tournamentName',
    'matches.status',
    'matches.startDate',
    'matches.endDate',
    'matches.surface',
    'matches.environment',
    'matches.city',
    'geocode.country',
    'weather.data.weather[0].description',
    'weather.data.main.temp',
    'weather.data.main.pressure'
  ]
  const rows = rawData.map(data => paths.map(path => get(data, path, '')))
  const table = { names, rows }
  return table
}

const contentHelper = (request, response, next) =>
  getMatches(request.headers.host)
    .then(({data}) => {
      axios.all(data.matches.map((matchesData) =>
        axios
          .all([getGeocode(request.headers.host, matchesData), getWeather(request.headers.host, matchesData)])
          .then(axios.spread((geocodeData, weatherData) =>
            makeRecord(matchesData, geocodeData.data, weatherData.data)
          ))
          .catch(error => console.log(`ERROR /GET api/content ${error.toString()}`))
      ))
        .then((rawData) =>
          response.status(200).json(formatData(rawData))
        )
    })


const connectContent = ({server, mode}) =>
  server.get('/api/content', contentHelper)

export default connectContent

