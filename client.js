const { io } = require('socket.io-client')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const chatRoomRepository = require('./repositories/chatRooms')

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  readline.question(`What's Your Name? `, username => {
    console.log(`Hi ${username}! Let's Start Chatting.`)

    const currentChatRooms = chatRoomRepository.getCurrentChatRooms()

    readline.question(
      `Please Select a Topic You Are Interested In!\n> ${currentChatRooms.join(
        ', '
      )} `,
      room => {
        socket.emit('joinRoom', {
          username: username.trim(),
          room: room.trim()
        })
      }
    )
  })
})

socket.on('botMessage', message => {
  console.log(message)
})

readline.on('line', input => {
  socket.emit('chat', input)
})
