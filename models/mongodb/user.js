const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: String,
    socketId: String,
    private: String,
    room: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
)

module.exports = mongoose.model('User', userSchema)
