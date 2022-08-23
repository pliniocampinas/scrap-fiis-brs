const connectionPool = require('../db/connectionPool')

module.exports = {
  async run() {
    console.log('Testing db connection...')
    connectionPool.query('SELECT 1', (error, results) => {
      if (error) {
        console.warn('Test failed')
        console.log(error)
        console.log(results)
        return
      }
      console.warn('Test suceeded')
    })
  }
}