const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const userRepository = require('./repositories/users')
const chatRoomRepository = require('./repositories/chatRooms')

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
  // 聊天室
  socket.on('joinRoom', ({ username, room }) => {
    // 確認 room 是否可進入
    const isRoomAvailable = chatRoomRepository.checkRoomAvailability(room)

    if (isRoomAvailable) {
      const user = userRepository.joinRoom(socket.id, username, room)

      socket.join(user.room)

      socket
        .to(room)
        .emit('botMessage', `${user.username} Has Joined the Room.`)
    } else {
      const currentChatRooms = chatRoomRepository.getCurrentChatRooms()
      socket.emit(
        'botMessage',
        `${room} Is Coming Soon! Stay Tuned.\nNow Please Choose Another Topic.\n> ${currentChatRooms.join(
          ' ,'
        )}`
      )
    }
  })

  // socket.emit('message', 'Welcome To Chat Room!')

  // socket.broadcast.emit('botMessage', 'A User Has Joined the Chat Room.')

  socket.on('chat', input => {
    socket.broadcast.emit('botMessage', input)
  })

  socket.on('disconnect', () => {
    const user = userRepository.getActiveUser(socket.id)

    if (user) {
      socket
        .to(user.room)
        .emit('botMessage', `${user.username} Has Left the Room`)
    }
  })
})

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
