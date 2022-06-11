const chatRoomRepository = require('../repositories/chatRoomRepository')

class PrivateChatRoomService {
  constructor () {
    this.message = 'I am an instance'
  }

  async getAllChatRooms () {
    const result = await chatRoomRepository.getAllChatRooms()

    return result.map(r => ({ id: r._id, name: r.name }))
  }

  checkRoomAvailability (room) {
    return chatRoomRepository.checkRoomAvailability(room.trim().toUpperCase())
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
