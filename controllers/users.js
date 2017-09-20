const User = require('../models/user')

exports.searchForUsers = function (req, res, next) {
  // Find Users who match query for username
  const query = req.query
  // use regex from mongo index???
  // res.send({ token: tokenForUser(user), user })
}
