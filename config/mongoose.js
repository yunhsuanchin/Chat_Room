const mongoose = require('mongoose')
const config = require('./config').mongodb
console.log({ config })

class MongooseConnect {
  constructor () {
    this.message = 'I am an instance'
  }

  getInstance () {
    mongoose.connect(config.uri, config.options)

    return mongoose.connection
  }
}

module.exports = new MongooseConnect().getInstance()
