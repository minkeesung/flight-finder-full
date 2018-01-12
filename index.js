// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')
const keys = require('./config/keys')

// keys.mongoURI

mongoose.connect('mongodb://minkeesung:password@ds251197.mlab.com:51197/flight_finder_dev');

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*'}))
router(app)

const PORT = process.env.PORT || 3090
const server = http.createServer(app)

server.listen(PORT)
console.log('server listening on:', PORT)
