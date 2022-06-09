const { io } = require('socket.io-client')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const chatRoomRepository = require('./repositories/chatRooms')
const userRepository = require('./repositories/users')

const socket = io('http://localhost:3000')

socket.emit('question', ans => {
  console.log({ ans })
})

socket.on('connect', () => {
  readline.question(`What's Your Name? `, username => {
    console.log(`Hi ${username}! Let's Start Chatting.`)

    socket.emit('userConnected', username)

    readline.question(
      `What Do You Aiming For?\n> A. Chatting With Somebody\n> B. Group Chatting`,
      onConnectQuestion
    )
  })
})

readline.on('line', input => {
  // // bot
  // if (input.includes('bot')) {
  //   readline.question(``)
  // }

  socket.emit('privateMessage', { content, to: username })

  // socket.emit('groupChat', input)
})

socket.on('chatMessage', message => {
  console.log(message)
})

socket.on('botMessage', message => {
  console.log(message)
})

const handleReselection = () => {}

const onConnectQuestion = answer => {
  if (answer.toUpperCase() === 'A') {
    const currentUsers = userRepository.getCurrentUsers()

    readline.question(`These Friends Are Waiting For You To Chat With.`)
  } else if (answer.toUpperCase() === 'B') {
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
  } else {
    readline.question(
      `Your Answer Was Too Ambiguous, Please Choose Again`,
      onConnectQuestion
    )
  }
}
