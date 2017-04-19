import fs from 'fs'
import moment from 'moment'
import morgan from 'morgan'
import path from 'path'

const connectLogging = ({server, mode}) => {

  // var logFolder = path.resolve('./logs')
  // fs.existsSync(logFolder) || fs.mkdirSync(logFolder)
  // const logFile = `${logFolder}/${mode}.${moment().format('YYYYMMDD')}.log`
  // var stream = fs.createWriteStream(logFile, { flags: 'a' })
  // server.use(morgan('common', { stream }))
}

export default connectLogging