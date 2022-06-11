const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  from: Schema.Types.ObjectId,
  to: Schema.Types.ObjectId,
  dateTime: Date,
  message: String
})

module.exports = mongoose.model('Message', messageSchema)
