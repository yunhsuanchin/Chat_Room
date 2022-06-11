const chatRoomService = require('../services/chatRoomService')

module.exports = {
  getAllChatRooms: async (req, res, next) => {
    try {
      const result = await chatRoomService.getAllChatRooms()
      res.locals.data = result

      next()
    } catch (error) {
      next(error)
    }
  }
}
