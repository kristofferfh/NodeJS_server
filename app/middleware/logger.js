const {format} = require("date-fns")
const {v4 : uuid} = require("uuid")
const fs = require("fs")
const path = require("path")
const fsPromises = require("fs").promises

const logEvents = async (msg, name) => {
  const time = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`
  const log = `${time}\t${uuid()}\t${msg}\n`

  try {
    if(!fs.existsSync(path.join(__dirname, "..", "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "..", "logs"))
    }
    await fsPromises.appendFile(path.join(__dirname, "..", "..", "logs", name), log)
  }
  catch (err) {
    console.log(err)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "requests.txt")
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logEvents, logger }