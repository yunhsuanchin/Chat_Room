const userService = require('../services/userService')
const chatRoomService = require('../services/chatRoomService')

module.exports = (io, socket) => {
  const onUserConnected = username => {
    userService.userConnect(socket.id, username)
  }

  const onUserJoinRoom = ({ username, room }) => {
    // 確認 room 是否可進入
    const isRoomAvailable = chatRoomService.checkRoomAvailability(room)

    if (isRoomAvailable) {
      const user = userService.joinRoom(socket.id, username, room)

      socket.join(user.room)

      socket
        .to(room)
        .emit('botMessage', `${user.username} Has Joined the Room.`)
    } else {
      const currentChatRooms = chatRoomService.getCurrentChatRooms()
      socket.emit(
        'botMessage',
        `${room} Is Coming Soon! Stay Tuned.\nNow Please Choose Another Topic.\n> ${currentChatRooms.join(
          ' ,'
        )}`
      )
    }
  }

  const onGroupChat = input => {
    const user = userService.getActiveUser(socket.id)

    socket.to(user.room).emit('chatMessage', input)
  }

  const onUserDisconnected = () => {
    const user = userService.getActiveUser(socket.id)

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
