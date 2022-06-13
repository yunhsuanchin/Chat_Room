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
    // const history = await userService.getHistoryMessage(user._id, user.room._id)

    // send user history
    io.to(socket.id).emit('botMessage', ``)

    // broadcast to the room
    socket
      .to(user.room.name)
      .emit('botMessage', `${user.name} Has Joined the Room.`)
  }

  const onUserRequest = async input => {
    const [user, targetUser] = await Promise.all([
      userService.getActiveUser(socket.id),
      userService.getTargetUserByName(input)
    ])

    if (targetUser && targetUser.room.name === 'LOBBY') {
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
      const target = user.room ? user.room.name : user.private

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
      // throw unavailable message
      io.to(user.socketId).emit(
        'botMessage',
        `${input} Is Busy Now, You Might Try Again Later.`
      )
    }
  }

  const onClientDisconnected = async () => {
    // store user's message to db
    const userMessage = messages.filter(m => m.socketId === socket.id)

    await Promise.all([
      userService.leaveRoom(socket.id),
      userService.storeMessages(userMessage)
    ])
  }

  socket.on('userConnected', onUserConnected)
  socket.on('joinRoom', onUserJoinRoom)
  socket.on('userRequest', onUserRequest)
  socket.conn.on('close', onClientDisconnected)
}
