const User = require('../models/user')

exports.queryForUsers = function (req, res, next) {
  // Find Users who match query for username
  const queryString = req.params.queryString
  console.log(queryString, typeof queryString)

  if (!queryString || typeof queryString !== 'string') {
    return res.status(422).send({error: 'Need to send a query string to search users'})
  }

  if (queryString.includes(' ')) {
    return res.status(422).send({error: 'No usernames have a space inside'})
  }

  const queryRegExp = new RegExp(queryString)

  User.find({username: {$regex: queryRegExp}}, '_id username', function (err, users) {
    if (err) return next(err)
    res.send(users)
  })
  // use regex from mongo index???
  // res.send({ token: tokenForUser(user), user })
}

exports.searchAllUsers = function (req, res, next) {
  // Find all users in database
  // const query = req.query
  User.find({}, '_id username', function (err, users) {
    if (err) return next(err)
    res.send(users)
  })
}
