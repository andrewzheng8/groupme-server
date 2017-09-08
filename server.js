// Main starting point of the application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan') // logger
const app = express()
const router = require('./router')
//add const mongoose = require('mongoose')
const cors = require('cors')

// DB Setup
// mongoose.connect('mongodb://localhost/crowdlearn')

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)
// app.use middleware
// Server Setup
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)

// add protocol and https for adding to heroku
