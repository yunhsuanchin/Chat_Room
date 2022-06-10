const userService = require('../services/userService')
const chatRoomService = require('../services/chatRoomService')
const helper = require('../utils/helpers.js')

module.exports = (io, socket) => {
  const onUserConnected = username => {
    username = helper.formatInput(username)
    userService.userConnect(socket.id, username, 'LOBBY')
  }

  const onUserJoinRoom = room => {
    console.log('userId', socket.id)
    userService.updateUserRoom(socket.id, helper.formatInput(room))
    const user = userService.getActiveUser(socket.id)
    console.log({ user })
    socket.join(user.room)
    socket.to(room).emit('botMessage', `${user.username} Has Joined the Room.`)
  }

  const onUserRequest = input => {
    const name = helper.formatInput(input)
    const user = userService.getActiveUser(socket.id)
    const currentUsers = userService.getActiveUsers()
    const targetUser = currentUsers.find(
      user => user.username === name && user.id !== socket.id
    )

    console.log({ user, currentUsers, targetUser })

    // calling someone
    if (targetUser && targetUser.room === 'LOBBY') {
      // get this person to private room
      userService.updateUserRoom(targetUser.id, socket.id)
      userService.updateUserRoom(socket.id, targetUser.id)

      console.log('2', { user, currentUsers, targetUser })

      // start private chat
      socket
        .to(user.room)
        .emit('botMessage', `You Can Start Chatting With ${user.username} Now.`)
      socket
        .to(targetUser.room)
        .emit(
          'botMessage',
          `You Can Start Chatting With ${targetUser.username} Now.`
        )
    } else {
      // talking to the room
      console.log('chatting')
      socket.to(user.room).emit('chatMessage', input)
    }
  }

  // const onGroupChat = input => {
  //   console.log('onGroupChat', socket)
  //   socket.to(socket.rooms).emit('chatMessage', input)
  // }

  // const onUserDisconnected = () => {
  //   const user = userService.getActiveUser(socket.id)
  //   if (user) {
  //     socket
  //       .to(user.room)
  //       .emit('botMessage', `${user.username} Has Left the Room`)
  //   }
  // }

  // // return active users
  // const onPrivateChatRequest = async callback => {
  //   const sockets = await io.fetchSockets()
  //   const currentUsers = userService.getActiveUsers(sockets.map(s => s.id))
  //   const otherUsers = currentUsers.filter(user => user.id !== socket.id)
  //   callback({ availablePeople: otherUsers })
  // }
  // // create a room for private chat
  // const onPrivateRoom = async receiverId => {
  //   const roomId = helper.generateRandomAlphanumeric(10)
  //   console.log({ receiverId, roomId })
  //   io.in(receiverId).socketsJoin(roomId)
  //   socket.join(roomId)
  //   io.to(roomId).emit('botMessage', 'You being invited')
  //   // const sockets = await io.fetchSockets()
  //   // console.log({ sockets })
  //   // socket.to(receiverId).emit('privateMessage', {
  //   //   content,
  //   //   sender: socket.id
  //   // })
  // }
  // const onClose = () => {
  //   console.log('close', socket.id)
  // }
  socket.on('userConnected', onUserConnected)
  socket.on('joinRoom', onUserJoinRoom)
  socket.on('userRequest', onUserRequest)
  // socket.on('groupChat', onGroupChat)
  // socket.on('disconnect', onUserDisconnected)
  // socket.on('privateChatRequest', onPrivateChatRequest)
  // socket.on('privateRoom', onPrivateRoom)
  // socket.conn.on('close', onClose)
}
