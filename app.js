const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const userHandler = require('./loaders/userHandler')

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

const onConnection = socket => {
  userHandler(io, socket)
}

io.on('connection', onConnection)

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
