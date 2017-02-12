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
  const headings = [
    { name: 'Tournament', type: 'micro'},
    { name: 'Status', type: 'medium'},
    { name: 'StartDate', type: 'micro'},
    { name: 'EndDate', type: 'large'},
    { name: 'Surface', type: 'small'},
    { name: 'Environment', type: 'small'},
    { name: 'City', type: 'micro'},
    { name: 'Country', type: 'micro'},
    { name: 'Weather', type: 'small'},
    { name: 'Temperature', type: 'small'},
    { name: 'Pressure', type: 'large'}
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
  const cols = rows[0].map((column, index) => rows.map(row => row[index]))
  const table = { headings, rows, cols}
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

