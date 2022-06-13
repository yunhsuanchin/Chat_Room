if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './config/env/.prod.env' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config/env/.dev.env' })
} else {
  require('dotenv').config({ path: './config/env/.dev.env' })
}

const { io } = require('socket.io-client')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const clientMessage = require('./src/messages/clientMessages')
const chatRoomService = require('./services/chatRoomService')

const socket = io('http://localhost:3000')

const onConnection = () => {
  // get user's name
  readline.question(clientMessage.nameQuestion, username => {
    console.log(clientMessage.welcomeMsg(username))

    // enter lobby
    socket.emit('userConnected', username)

    setTimeout(() => {
      console.log(clientMessage.onConnectHint)
    }, 500)
  })
}

readline.on('line', async content => {
  const rooms = await chatRoomService.getAllChatRooms()
  const currentRooms = rooms.map(r => r.name)
  const roomName = content.trim().toUpperCase()

  if (roomName === 'ROOM') {
    // render room list
    console.log(clientMessage.topicQuestion(currentRooms))
  } else if (currentRooms.includes(roomName)) {
    const selectedRoom = rooms.find(room => room.name === roomName)
    // enter room
    socket.emit('joinRoom', selectedRoom._id)
  } else {
    // handle other answers
    socket.emit('userRequest', content)
  }
})

socket.on('connect', onConnection)
socket.on('chatMessage', message => {
  console.log(message)
})
socket.on('botMessage', message => {
  console.log(message)
})
