const connectionPool = require('../db/connectionPool')

module.exports = {
  async run() {
    console.log('initializing tables')

    console.log('initializing scrapped_funds')
    const sql = `
      CREATE TABLE IF NOT EXISTS scrapped_funds (
        created_on TIMESTAMP NOT NULL,
        acronym VARCHAR(10) NOT NULL,
        url TEXT,
        long_name TEXT,
        admin TEXT,
        PRIMARY KEY (created_on, acronym)
      );
    `
    try {
      await connectionPool.query(sql)
    } catch(err) {
      console.log('initializing scrapped_funds failed')
      console.log(err)
      return
    }
    console.warn('Succeeded')
  }
}