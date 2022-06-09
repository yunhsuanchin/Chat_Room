const userRepository = require('../repositories/users')

module.exports = (io, socket) => {
  const onUserConnected = username => {
    userRepository.userContent(socket.id, username)
  }

  const onUserJoinRoom = ({ username, room }) => {
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
  }

  const onGroupChat = input => {
    const user = userRepository.getActiveUser(socket.id)

    socket.to(user.room).emit('chatMessage', input)
  }

  const onUserDisconnected = () => {
    const user = userRepository.getActiveUser(socket.id)

    if (user) {
      socket
        .to(user.room)
        .emit('botMessage', `${user.username} Has Left the Room`)
    }
  }

  socket.on('userConnected', onUserConnected)
  socket.on('joinRoom', onUserJoinRoom)
  socket.on('groupChat', onGroupChat)
  socket.on('disconnect', onUserDisconnected)
}
