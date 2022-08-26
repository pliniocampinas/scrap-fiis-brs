const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute(funds) {
    console.log('Inserting to scrapped_funds')
    const sql = `
      INSERT INTO scrapped_funds (created_on, acronym, url, long_name, admin)
      VALUES ($1, $2, $3, $4, $5);
    `
    const currentDate = new Date()
    funds.forEach(async fund => {
      try {
        await connectionPool.query(sql, [
          currentDate,
          fund.acronym,
          fund.url,
          fund.longName,
          fund.admin,
        ])
      } catch(err) {
        console.log('Inserting to scrapped_funds failed', fund)
        console.log(err)
        return
      }
    });
    console.warn('Inserted')
  }
}