class PrivateHelper {
  constructor () {
    this.message = 'I am an instance'
  }

  formatInput (input) {
    return input.trim().toUpperCase()
  }

  generateRandomAlphanumeric (length) {
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    let result = ''
    for (let i = 0; i < length; i++) {
      let randomNum = Math.floor(Math.random() * charactersLength)
      result += characters[randomNum]
    }

    return result
  }
}

class Helper {
  constructor () {
    throw new Error('Use Helper.getInstance()')
  }

  static getInstance () {
    if (!Helper.instance) {
      Helper.instance = new PrivateHelper()
    }

    return Helper.instance
  }
}

module.exports = Helper.getInstance()
