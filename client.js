const { io } = require('socket.io-client')
const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('start chatting')
})

socket.on('message', data => {
  console.log('message', data)
})
