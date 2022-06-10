const INIT_USERS = ['user001', 'user002', 'user003', 'user004']

const currentUsers = []

class PrivateUserRepository {
  constructor () {
    this.message = 'I am an instance'
  }

  getActiveUsers () {
    return currentUsers
  }

  getActiveUser (id) {
    return currentUsers.find(user => user.id === id)
  }

  userConnect (id, username, room) {
    currentUsers.push({ id, username, room })
  }

  updateUserRoom (id, room) {
    const user = this.getActiveUser(id)
    user.room = room
  }

  leaveRoom (id) {
    const index = currentUsers.findIndex(user => user.id === id)
    if (index !== -1) {
      currentUsers.splice(index, 1)
    }
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
