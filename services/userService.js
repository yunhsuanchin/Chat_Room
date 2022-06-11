const chatRoomService = require('../services/chatRoomService')
const userRepository = require('../repositories/userRepository')
const helper = require('../utils/helpers')

class PrivateUserService {
  constructor () {
    this.message = 'I am an instance'
  }

  async login (socketId, username, roomId) {
    if (roomId === 'LOBBY') {
      const lobbyId = await chatRoomService.getRoomId('LOBBY')
      roomId = lobbyId
    }

    username = helper.formatInput(username)
    await userRepository.login(socketId, username, roomId)
  }

  async joinRoom (socketId, roomId) {
    const user = await userRepository.joinRoom(socketId, roomId)

    return user
  }

  async getTargetUserByName (name) {
    name = helper.formatInput(name)
    const user = await userRepository.getTargetUserByName(name)

    return user
  }

  async getActiveUser (socketId) {
    const user = await userRepository.getActiveUser(socketId)

    return user
  }

  async leaveRoom (socketId) {
    await userRepository.leaveRoom(socketId)
  }

  async updatePrivateStatus (targetUserId, userId) {
    await userRepository.updatePrivateStatus(targetUserId, userId)
  }
}

class UserService {
  constructor () {
    throw new Error('Use UserService.getInstance()')
  }

  static getInstance () {
    if (!UserService.instance) {
      UserService.instance = new PrivateUserService()
    }

    return UserService.instance
  }
}

module.exports = UserService.getInstance()
