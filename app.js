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
  // socket.emit('message', 'Welcome To Chat Room!')

  socket.broadcast.emit('message', 'A User Has Joined the Chat Room.')

  socket.on('chat', input => {
    socket.broadcast.emit('message', input)
  })
})

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
