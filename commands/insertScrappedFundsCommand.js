const connectionPool = require('../db/connectionPool')
const Fund = require('../models/Fund')

module.exports = {
  async execute(scrappedFunds) {
    console.log('Inserting to scrapped_funds')

    const sql = `
      INSERT INTO scrapped_funds (created_on, acronym, url, long_name, admin)
      VALUES ($1, $2, $3, $4, $5);
    `
    const currentDate = new Date()
    scrappedFunds.forEach(async scrappedFund => {

      const fund = new Fund(scrappedFund)
      
      const validation = fund.validade()
      if(validation.isValid === false) {
        console.log('Validation Error', validation.error)
        return
      }

      try {
        await connectionPool.query(sql, [
          currentDate,
          fund.acronym,
          fund.url,
          fund.longName,
          fund.admin,
        ])
      } catch(err) {
        console.log('Database error', fund)
        console.log(err)
        return
      }
    });
    console.log('Inserted')
  }
}