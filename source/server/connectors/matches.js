import { middleware } from 'apicache'
import moment from 'moment'
import matches from '../datastore/tournament.json'

function matchesHelper(config, request, response, next) {

  const { expire, notify } = config
  const expiry = moment().add(...expire).format('YYYY:MM:DD-HH:mm:ss (x)')

  notify()

  response.json({ matches, expiry })
}

function connectMatches({server, mode}) {

  const matchesExpire = (mode === 'production') ? [1, 'day'] : [20, 'seconds']
  const matchesNotify = (mode === 'production') ? () => { } : () => console.log(`${moment().format('YYYY:MM:DD-HH:mm:ss - ')}Calling Matches API`)
  const matchesConfig = { expire: matchesExpire, notify: matchesNotify }
  const matchesRoute = '/api/matches'
  const matchesCache = middleware(matchesExpire.join(' '), (request, response) => response.statusCode === 200)
  const matchesMiddle = matchesHelper.bind(this, matchesConfig)

  server.get(matchesRoute, matchesCache, matchesMiddle)
}

export default connectMatches