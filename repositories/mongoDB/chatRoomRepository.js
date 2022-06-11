const ChatRoom = require('../../models/mongodb/chatRoom')

class PrivateChatRoomRepository {
  constructor () {
    this.message = 'I am an instance'
  }

  getAllChatRooms () {
    require('../../config/mongoose')
    return ChatRoom.find().lean()
  }

  getRoomId (roomName) {
    require('../../config/mongoose')
    return ChatRoom.findOne({ name: roomName })
  }
}

class ChatRoomRepository {
  constructor () {
    throw new Error('Use ChatRoomRepository.getInstance()')
  }

  static getInstance () {
    if (!ChatRoomRepository.instance) {
      ChatRoomRepository.instance = new PrivateChatRoomRepository()
    }

    return ChatRoomRepository.instance
  }
}

module.exports = ChatRoomRepository.getInstance()
