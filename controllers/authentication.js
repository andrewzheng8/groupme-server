const jwt = require('jwt-simple')
const User = require('../models/user')

function tokenForUser (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, 'mysupersecret')
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const user = req.user
  res.send({ token: tokenForUser(user), user })
}

exports.signup = function (req, res, next) {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide username, password, and residence address'})
  }

  // See if a user with the given username exists
  User.findOne({ username: username }, function (err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Username is in use' })
    }
    // If a user with email does NOT exist, create and save user record
    const user = new User({
      username: username,
      password: password
      // residence: residence,
      // img_url: 'https://www.atomix.com.au/media/2015/06/atomix_user31.png'
    })
    console.log('creating new user', user)
    user.save(function (err) {
      if (err) { return next(err) }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user), user })
    })
  })
}
