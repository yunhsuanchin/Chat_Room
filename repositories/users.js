const INIT_USERS = ['user001', 'user002', 'user003', 'user004']

class PrivateUserRepository {
  constructor () {
    this.message = 'I am an instance'

    this.currentUsers = new Map()
  }

  joinRoom (id, username, room) {
    this.currentUsers.set(id, { username, room })

    return this.getActiveUser(id)
  }

  getActiveUser (id) {
    return this.currentUsers.get(id)
  }

  leaveRoom (id) {
    this.currentUsers.delete(id)
  }
}

class UserRepository {
  constructor () {
    throw new Error('Use UserRepository.getInstance()')
  }

  static getInstance () {
    if (!UserRepository.instance) {
      UserRepository.instance = new PrivateUserRepository()
    }

    return UserRepository.instance
  }
}

module.exports = UserRepository.getInstance()
