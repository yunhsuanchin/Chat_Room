const userRepository = require('../repositories/userRepository')

class PrivateUserService {
  constructor () {
    this.message = 'I am an instance'
  }

  getCurrentUsers () {
    return userRepository.getCurrentUsers()
  }

  getActiveUser (id) {
    return userRepository.getActiveUser(id)
  }

  joinRoom (id, username, room) {
    userRepository.joinRoom(id, username, room)
    return this.getActiveUser(id)
  }

  leaveRoom (id) {
    userRepository.leaveRoom(id)
  }

  userConnect (id, username) {
    userRepository.userConnect(id, username)
    return this.getActiveUser(id)
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
