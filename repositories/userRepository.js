const INIT_USERS = ['user001', 'user002', 'user003', 'user004']

const currentUsers = new Map()

class PrivateUserRepository {
  constructor () {
    this.message = 'I am an instance'
  }

  getCurrentUsers () {
    console.log('get', currentUsers)
    return Array.from(currentUsers.values())
  }

  getActiveUser (id) {
    return currentUsers.get(id)
  }

  joinRoom (id, username, room) {
    currentUsers.set(id, { username, room })
  }

  leaveRoom (id) {
    currentUsers.delete(id)
  }

  userConnect (id, username) {
    currentUsers.set(id, { username })
    console.log('set', currentUsers)

    return this.getActiveUser(id)
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
