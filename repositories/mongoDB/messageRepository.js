const Message = require('../../models/mongodb/message')

class PrivateMessageRepository {
  constructor () {
    this.message = 'I am an instance'
  }

  storeMessages (userMessage) {
    require('../../config/mongoose')
    return Message.insertMany(userMessage)
  }

  getHistoryMessage (userId, roomId) {
    require('../../config/mongoose')
    return Message.find({ from: userId, room: roomId })
      .populate('to')
      .populate('room')
      .select(['to', 'room', 'dateTime', 'message'])
  }
}

class MessageRepository {
  constructor () {
    throw new Error('Use MessageRepository.getInstance()')
  }

  static getInstance () {
    if (!MessageRepository.instance) {
      MessageRepository.instance = new PrivateMessageRepository()
    }

    return MessageRepository.instance
  }
}

module.exports = MessageRepository.getInstance()
