const User = require('../models/user')

// exports.getContacts = function(req, res, next {
//   userId = req.userId
//   if (!userID) {
//     return res.status(422).send({ error: 'Must send a userId to search contacts' })
//   }
//
//   User.find
// })

exports.addFriend = function (req, res, next) {
  console.log('************ in addFriend controller function ********************')
  const userId = req.params.userId
  const friendId = req.body._id
  console.log('*****friendId', friendId)
  if (!userId || !friendId) {
    return res.status(422).send({error: 'a userId and friendId to add someone to friends list'})
  }

  User.findById(userId, 'friends', function (err, user) {
    user.friends.push(friendId)

    user.save((err, savedUser) => {
      if (err) next(err)
      res.json(savedUser)
    })
  })
}
