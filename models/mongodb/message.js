const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  dateTime: Date,
  message: String
})

module.exports = mongoose.model('Message', messageSchema)
