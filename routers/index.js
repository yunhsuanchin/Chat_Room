const express = require('express')
const router = express.Router()
const chatRoom = require('./modules/chatRoom')

router.use('/chatRoom', chatRoom)

module.exports = router
