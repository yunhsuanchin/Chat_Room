const express = require('express')
const router = express.Router()
const chatRoomController = require('../../controllers/chatRoomController')

router.get('/', chatRoomController.getAllChatRooms)

module.exports = router
