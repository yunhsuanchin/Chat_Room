const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')
const config = require('../config/config').redis

module.exports = async io => {
  console.log('config:', config.host)

  const pubClient = createClient({ url: config.host })
  const subClient = pubClient.duplicate()

  await Promise.all([pubClient.connect(), subClient.connect()])
  io.adapter(createAdapter(pubClient, subClient))
}
