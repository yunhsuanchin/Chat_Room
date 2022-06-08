const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

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

io.on('connection', socket => {
  console.log('WS connect')
  socket.emit('message', 'Welcome')

  socket.broadcast.emit('message', 'user has joined')
})

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
