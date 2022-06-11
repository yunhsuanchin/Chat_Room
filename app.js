const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')
const userHandler = require('./loaders/userHandler')
const router = require('./routers')
const responseHandler = require('./middlewares/responseHandler')

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

const pubClient = createClient({ url: 'redis://localhost:6379' })
const subClient = pubClient.duplicate()

const onConnection = socket => {
  userHandler(io, socket)
}

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient))
  // io.listen(PORT)
  io.on('connection', onConnection)
})

app.listen(PORT, () => {
  console.log('listening')
})
