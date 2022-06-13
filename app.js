if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './config/env/.env.prod' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config/env/.env.dev' })
} else {
  require('dotenv').config({ path: './config/env/.env.dev' })
}

const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')
const userHandler = require('./loaders/userHandler')
const router = require('./routers')
const responseHandler = require('./middlewares/responseHandler')
const config = require('./config/config').redis

const PORT = 3000
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'https://example.com',
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

app.use(router)
app.use(responseHandler)

const pubClient = createClient({ url: `${config.host}:${config.port}` })
const subClient = pubClient.duplicate()

const onConnection = socket => {
  userHandler(io, socket)
}

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient))
  io.listen(httpServer)
  io.on('connection', onConnection)
})

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
