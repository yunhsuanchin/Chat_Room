const chatRoomRepository = require('../repositories/chatRoomRepository')

class PrivateChatRoomService {
  constructor () {
    this.message = 'I am an instance'
  }

  getCurrentChatRooms () {
    return chatRoomRepository.getCurrentChatRooms()
  }

  checkRoomAvailability (room) {
    return chatRoomRepository.checkRoomAvailability(room)
  }
}

class ChatRoomService {
  constructor () {
    throw new Error('Use ChatRoomService.getInstance()')
  }

  static getInstance () {
    if (!ChatRoomService.instance) {
      ChatRoomService.instance = new PrivateChatRoomService()
    }

    return ChatRoomService.instance
  }
}

module.exports = ChatRoomService.getInstance()
