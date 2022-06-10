const INIT_ROOM_TOPICS = ['MUSIC', 'LIFESTYLE', 'SPORTS', 'JOBS', 'NEWS']

class PrivateChatRoomRepository {
  constructor () {
    this.message = 'I am an instance'

    this.chatRooms = new Set(INIT_ROOM_TOPICS)
  }

  getCurrentChatRooms () {
    return Array.from(this.chatRooms)
  }

  checkRoomAvailability (room) {
    return this.chatRooms.has(room)
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
