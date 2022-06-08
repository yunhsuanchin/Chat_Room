const { io } = require('socket.io-client')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  readline.question(`What's Your Name? `, name => {
    console.log(`Hi ${name}! Let's Start Chatting.`)
  })
})

socket.on('message', message => {
  console.log(message)
})

readline.on('line', input => {
  socket.emit('chat', input)
})
