const userRepository = require('../repositories/userRepository')

class PrivateUserService {
  constructor () {
    this.message = 'I am an instance'
  }

  getActiveUsers () {
    return userRepository.getActiveUsers()
  }

  getActiveUser (id) {
    return userRepository.getActiveUser(id)
  }

  userConnect (id, username, room) {
    userRepository.userConnect(id, username, room)
    console.log('currentUsers', this.getActiveUsers())
  }

  updateUserRoom (id, room) {
    userRepository.updateUserRoom(id, room)
  }

  leaveRoom (id) {
    userRepository.leaveRoom(id)
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
