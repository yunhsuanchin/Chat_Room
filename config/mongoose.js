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

    return mongoose.connection
  }
}

module.exports = new MongooseConnect().getInstance()
