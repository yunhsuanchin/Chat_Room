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

// const handlePurposeSelected = (answer, userId, username) => {
//   const room = currentChatRooms.find(
//     room => answer.trim().toUpperCase() === room
//   )
//   if (room) {
//     // group chat
//     socket.emit('joinRoom', {
//       username,
//       room
//     })
//   } else {
//     socket.emit('privateChatRequest', {
//       username,
//       room
//     })
//   }
//   // if (answer.toUpperCase() === 'A') {
//   //   handlePrivateChatRequest()
//   // } else if (answer.toUpperCase() === 'B') {
//   //   handleChatRoom(userId)
//   // } else {
//   //   console.log(clientMessage.invalidWarningMsg)
//   //   setTimeout(() => {
//   //     readline.question(clientMessage.purposeQuestion(), handlePurposeSelected)
//   //   }, 500)
//   // }
// }

// const handlePrivateChatRequest = () => {
//   // get active users
//   socket.emit('privateChatRequest', res => {
//     if (res.availablePeople.length) {
//       // select a user to chat with
//       const usernames = res.availablePeople.map(user => user.username)
//       readline.question(clientMessage.usersList(usernames), inputName => {
//         const selectedUser = res.availablePeople.find(
//           user => user.username === inputName.trim().toUpperCase()
//         )

//         console.log('selectedUser', selectedUser)

//         // start private chat
//         handlePrivateChat(selectedUser.id, selectedUser.username)
//       })
//     } else {
//       console.log(clientMessage.noUserMsg)
//       setTimeout(() => {
//         handleChatRoom()
//       }, 500)
//     }
//   })
// }

// const handlePrivateChat = (receiverId, receiverName) => {
//   console.log(clientMessage.talkToSomeone(receiverName))
//   console.log({ receiverId, receiverName })

//   // enter private room
//   socket.emit('privateRoom', receiverId)
// }

// // listen to user typing
// readline.on('line', content => {
//   socket.emit('groupChat', content)
// })

// // socket.on('privateMessage', ({ content, sender }) => {
// //   console.log('socket', socket)
// //   console.log(content)
// // })

// // readline.on('line', content => {
// //   console.log('readline 2')
// //   socket.emit('privateMessage', {
// //     content,
// //     receiverId
// //   })
// // })

// const handleChatRoom = () => {
//   // save user info
//   const currentChatRooms = chatRoomService.getCurrentChatRooms()

//   readline.question(clientMessage.topicQuestion(currentChatRooms), room => {
//     socket.emit('joinRoom', {
//       username,
//       room
//     })
//   })
// }

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
