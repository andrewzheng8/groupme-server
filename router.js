const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

const UsersController = require('./controllers/users')

module.exports = function (app) {
  // *** authentication routes
  app.get('/', requireAuth, function (req, res) {
    res.send({authenticated: true, message: 'Token is valid' })
  })
  app.post('/api/v1/signin', requireSignin, Authentication.signin)
  app.post('/api/v1/signup', Authentication.signup)

  app.get('/api/v1/users/query/:queryString', UsersController.queryForUsers)
  app.get('/api/v1/users', UsersController.searchAllUsers)

  //
}
