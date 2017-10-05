// Main starting point of the application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
// var methodOverride = require('method-override')
const morgan = require('morgan') // logger
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')

// DB Setup
mongoose.connect('mongodb://localhost/groupme-clone')

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
// app.use(methodOverride())
// app.use(function (err, req, res, next) {
//   // error handling logic
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })
router(app)
// app.use middleware
// Server Setup
const port = process.env.PORT || 8080
const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('a user connected')
})

server.listen(port, function () {
  console.log('Server listening on:', port)
})

// add protocol and https for adding to heroku
