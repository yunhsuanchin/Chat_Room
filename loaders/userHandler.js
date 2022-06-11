const userService = require('../services/userService')
const messages = []

module.exports = (io, socket) => {
  const onUserConnected = async username => {
    // enter lobby
    await userService.login(socket.id, username, 'LOBBY')
  }

  const onUserJoinRoom = async roomId => {
    // update user's room
    const user = await userService.joinRoom(socket.id, roomId)

    socket.join(user.room.name)
    // message to the user
    io.to(socket.id).emit(
      'botMessage',
      `You Have Successfully Joined ${user.room.name} Room.`
    )

    // loading history from the user
    const history = await userService.getHistoryMessage(user._id, user.room._id)
    console.log('history', history)

    // send user history
    io.to(socket.id).emit('botMessage', ``)

    // broadcast to the room
    socket
      .to(user.room.name)
      .emit('botMessage', `${user.name} Has Joined the Room.`)
  }

  const onUserRequest = async input => {
    console.log('socket', socket.id)
    const [user, targetUser] = await Promise.all([
      userService.getActiveUser(socket.id),
      userService.getTargetUserByName(input)
    ])

    console.log({ user, targetUser })

    if (targetUser && targetUser.room.name === 'LOBBY') {
      console.log('1')
      // update user's room & private connection
      await userService.updatePrivateStatus(targetUser.socketId, user.socketId)

      io.to(targetUser.socketId).emit(
        'botMessage',
        `${user.name} Invited You To A Private Chat.`
      )
      io.to(user.socketId).emit(
        'botMessage',
        `${targetUser.name} Is Available Now, You Could Start Chatting.`
      )
    } else if ((user.room && user.room.name !== 'LOBBY') || user.private) {
      // chatting with existing room
      console.log('2')
      const target = user.room ? user.room.name : user.private
      console.log({ target })

      // store messages to temp array
      messages.push({
        socketId: socket.id,
        from: user._id,
        to: user.private || null,
        room: user.room ? user.room._id : null,
        dateTime: Date.now(),
        message: input
      })
      socket.broadcast.to(target).emit('chatMessage', input)
    } else {
      console.log('3')
      // throw unavailable message
      io.to(user.socketId).emit(
        'botMessage',
        `${input} Is Busy Now, You Might Try Again Later.`
      )
    }
  }

  const onClientDisconnected = async () => {
    // store user's message to db
    console.log({ messages })
    const userMessage = messages.filter(m => m.socketId === socket.id)
    console.log({ userMessage })

    await Promise.all([
      userService.leaveRoom(socket.id),
      userService.storeMessages(userMessage)
    ])
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

  socket.on('userConnected', onUserConnected)
  socket.on('joinRoom', onUserJoinRoom)
  socket.on('userRequest', onUserRequest)
  // socket.on('groupChat', onGroupChat)
  // socket.on('disconnect', onUserDisconnected)
  // socket.on('privateChatRequest', onPrivateChatRequest)
  // socket.on('privateRoom', onPrivateRoom)
  socket.conn.on('close', onClientDisconnected)
}
