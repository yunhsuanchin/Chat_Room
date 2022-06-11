const db = require('../../../config/mongoose')
const chatRoomData = require('../seedData/chatRoomData.json')
const UserData = require('../seedData/userData.json')
const ChatRoom = require('../chatRoom')
const User = require('../user')

db.once('open', async () => {
  try {
    await Promise.all([ChatRoom.deleteMany(), User.deleteMany()])
    await Promise.all([
      ChatRoom.insertMany(chatRoomData),
      User.insertMany(UserData)
    ])
    console.log('seeders created.')

    process.exit()
  } catch (error) {
    console.error(error)
  }
})
