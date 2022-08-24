const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute() {
    console.log('Inserting to scrapped_funds')
    const sql = `
      INSERT INTO scrapped_funds (created_on, acronym, relative_url, name, admin)
      VALUES ($1, $2, $3, $4, $5);
    `
    const fund = {
      relativeUrl: "relativeUrl",
      acronym: "acronym",
      name: "name",
      admin: "admin",
    }
    try {
      await connectionPool.query(sql, [
        new Date(),
        fund.acronym,
        fund.relativeUrl,
        fund.name,
        fund.admin,
      ])
    } catch(err) {
      console.log('Inserting to scrapped_funds failed')
      console.log(err)
      return
    }
    console.warn('Inserted')
  }
}