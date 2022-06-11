const mongoose = require('mongoose')

class MongooseConnect {
  constructor () {
    this.message = 'I am an instance'
  }

  getInstance () {
    mongoose.connect('mongodb://localhost:27017/chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('db connect')
    return mongoose.connection
  }
}

module.exports = new MongooseConnect().getInstance()
