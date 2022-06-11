const chatRoomRepository = require('../repositories/mongoDB/chatRoomRepository')

class PrivateChatRoomService {
  constructor () {
    this.message = 'I am an instance'
  }

  async getRoomId (roomName) {
    const result = await chatRoomRepository.getRoomId(roomName)
    return result
  }

  getAllChatRooms () {
    return chatRoomRepository.getAllChatRooms()
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
