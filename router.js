const Authentication = require('./controllers/authentication')
//const passportService = require('./services/passport')
const passport = require('passport')


const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
  // *** authentication routes
  app.get('/', requireAuth, function (req, res) {
    console.log('I am the server')
    res.send({ message: 'Token is valid' })
  })
  app.post('/api/v1/signin', requireSignin, Authentication.signin)
  app.post('/api/v1/signup', Authentication.signup)
  //
}
