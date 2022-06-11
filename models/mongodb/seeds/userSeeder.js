const db = require('../../../config/mongoose')
const data = require('../seedData/userData.json')
const User = require('../user')

db.once('open', async () => {
  try {
    await User.deleteMany()
    await User.insertMany(data)
    console.log('user seeders created.')
  } catch (error) {
    console.error(error)
  }
})
