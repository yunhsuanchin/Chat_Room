const { io } = require('socket.io-client')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const clientMessage = require('./messages/clientMessages')
const chatRoomRepository = require('./repositories/chatRooms')
const userRepository = require('./repositories/users')

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  readline.question(clientMessage.nameQuestion, username => {
    console.log(clientMessage.welcomeMsg(username))
    socket.emit('userConnected', username)

    setTimeout(() => {
      readline.question(clientMessage.purposeQuestion(), ans => {
        handlePurposeSelected(ans, username)
      })
    }, 500)
  })
})

readline.on('line', input => {
  console.log('readline', input)
  // // bot
  // if (input.includes('bot')) {
  //   readline.question(``)
  // }

  // socket.emit('privateMessage', { content, to: username })

  // socket.emit('groupChat', input)
})

socket.on('chatMessage', message => {
  console.log(message)
})

socket.on('botMessage', message => {
  console.log(message)
})

// const handleReselection = () => {}

// const resolveQuestion = question => {
//   return new Promise(resolve => {
//     readline.question(question, answer => resolve(answer))
//   })
// }

// const resolveWriteMsg = message => {
//   return new Promise(resolve => {
//     readline.write(message)
//   })
// }

const handlePurposeSelected = (answer, username) => {
  if (answer.toUpperCase() === 'A') {
    handlePrivateChat(username)
  } else if (answer.toUpperCase() === 'B') {
    handleChatRoom(username)
  } else {
    console.log(clientMessage.invalidWarningMsg)
    setTimeout(() => {
      readline.question(clientMessage.purposeQuestion(), handlePurposeSelected)
    }, 500)
  }
}

const handleChatRoom = username => {
  const currentChatRooms = chatRoomRepository.getCurrentChatRooms()

  readline.question(clientMessage.topicQuestion(currentChatRooms), room => {
    socket.emit('joinRoom', {
      username: username.trim().toUpperCase(),
      room: room.trim().toUpperCase()
    })
  })
}

const handlePrivateChat = username => {
  const currentUsers = userRepository.getCurrentUsers()
  console.log({ currentUsers })

  if (currentUsers.length) {
    readline.question(clientMessage.usersList(currentUsers), selectedUser => {
      handleUserSelected(username, selectedUser, currentUsers)
    })
  } else {
    console.log(clientMessage.noUserMsg)
    setTimeout(() => {
      handleChatRoom(username)
    }, 500)
  }
}

const handleUserSelected = (username, selectedUser, currentUsers) => {
  if (
    currentUsers.some(
      user => user.username === selectedUser.trim().toUpperCase()
    )
  ) {
    console.log(clientMessage.matchingUser)
  }
}
