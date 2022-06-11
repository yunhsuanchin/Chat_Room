const User = require('../../models/mongodb/user')

class PrivateUserRepository {
  constructor () {
    this.message = 'I am an instance'
  }

  login (socketId, username, roomId) {
    require('../../config/mongoose')

    return User.findOneAndUpdate(
      { name: username },
      { socketId, room: roomId },
      { upsert: true }
    )
  }

  joinRoom (socketId, roomId) {
    require('../../config/mongoose')

    return User.findOneAndUpdate(
      { socketId },
      { room: roomId },
      { new: true }
    ).populate({ path: 'room' })
  }

  getTargetUserByName (name) {
    require('../../config/mongoose')

    return User.findOne({
      name,
      socketId: { $exists: true, $ne: '' }
    }).populate({
      path: 'room'
    })
  }

  getActiveUser (socketId) {
    require('../../config/mongoose')

    return User.findOne({ socketId }).populate({
      path: 'room'
    })
  }

  leaveRoom (socketId) {
    require('../../config/mongoose')

    return User.findOneAndUpdate(
      { socketId },
      { socketId: '', room: null, private: '' }
    )
  }

  updatePrivateStatus (targetUserId, userId) {
    require('../../config/mongoose')

    return Promise.all([
      User.updateOne(
        { socketId: targetUserId },
        { private: userId, room: null }
      ),
      User.updateOne(
        { socketId: userId },
        { private: targetUserId, room: null }
      )
    ])
  }
}

class UserRepository {
  constructor () {
    throw new Error('Use UserRepository.getInstance()')
  }

  static getInstance () {
    if (!UserRepository.instance) {
      UserRepository.instance = new PrivateUserRepository()
    }

    return UserRepository.instance
  }
}

module.exports = UserRepository.getInstance()
