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

mongoose.connect(keys.mongoURI);

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log('server listening on:', PORT)
