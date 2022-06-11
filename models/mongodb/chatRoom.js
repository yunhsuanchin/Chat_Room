const mongoose = require('mongoose')
const { Schema } = mongoose

const chatRoomSchema = new Schema({
  name: String
})

module.exports = mongoose.model('ChatRoom', chatRoomSchema)
