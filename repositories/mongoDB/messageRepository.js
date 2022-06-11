const Message = require('../../models/mongodb/message')

class PrivateMessageRepository {
  constructor () {
    this.message = 'I am an instance'
  }

  storeMessages (userMessage) {
    return Message.insertMany(userMessage)
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
