const connectionPool = require('../db/connectionPool')

module.exports = {
  async run() {
    console.log('Testing db connection...')
    try {
      await connectionPool.query('SELECT 1')
    } catch(err) {
      console.warn('Test failed')
      console.log(err)
      return
    }
    console.warn('Test suceeded')
  }
}