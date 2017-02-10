import axios from 'axios'
import moment from 'moment'


const getMatches = host => {
  const endpointMatches = `http://${host}/api/matches`
  const promise = axios.get(endpointMatches)
  return promise
}

const getGeocode = (host, {location}) => {
  const endpointGeocode = `http://${host}/api/geocode/${location}`
  return axios.get(endpointGeocode)
}

const getWeather = (host, {location, city}) => {
  const endpointWeather = `http://${host}/api/weather/${location}/${city}`
  return axios.get(endpointWeather)
}

function connectContent({server, mode}) {

  server.get('/api/content', (request, response, next) => {
    const { host } = request.headers
    getMatches(host)
      .then(({data}) => {
        data.matches.map((matchesData) =>
          axios
            .all([getGeocode(host, matchesData), getWeather(host, matchesData)])
            .then(axios.spread((geocodeData, weatherData) => {
              console.log('a', matchesData)
              console.log('b', geocodeData.data)
              console.log('c', weatherData.data)
              console.log('---------------------------------------------------')
            })))})})}

export default connectContent