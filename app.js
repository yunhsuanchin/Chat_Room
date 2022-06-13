if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './config/env/.prod.env' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config/env/.dev.env' })
} else {
  require('dotenv').config({ path: './config/env/.dev.env' })
}

const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const userHandler = require('./loaders/userHandler')
const router = require('./routers')
const responseHandler = require('./middleware/responseHandler')

const PORT = 3000
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'https://example.com',
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

app.use(router)
app.use(responseHandler)

const onConnection = socket => {
  userHandler(io, socket)
}

httpServer.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`)

  io.listen(httpServer)
  io.on('connection', onConnection)
})
