const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Define sub-document models

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'user' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  content: String // should be just string or other media later??
  timestamp: { type: Date, default: Date.now}
})

messageSchema.index({timestamp: -1})

// Define our model
const chatSchema = new Schema({
  name: String,
  password: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }] // ??? remember to remove from here and user profiles,
  messages: [messageSchema]
})


// Create the model class
const ModelClass = mongoose.model('chat', chatSchema)

// Export the model
module.exports = ModelClass
