
module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log('I am the server')
    res.send('Look at this cool server') 
  })
}
