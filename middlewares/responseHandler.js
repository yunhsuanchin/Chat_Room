module.exports = (req, res, next) => {
  const { data, message } = res.locals
  const response = new ResponseData(data, message)

  return res.status(200).json(response)
}

class ResponseData {
  constructor (data, message) {
    this.success = true
    this.message = message || ''
    this.data = data
  }
}
