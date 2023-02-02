const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute() {
    console.log('Query assets')
    
    const sql = `
      SELECT sequential, city
      FROM scrapped_assets
      WHERE city <> '';
    `

    try {
      const query = await connectionPool.query(sql)
      console.log('Query returns ', query.rowCount, ' rows')
      return query.rows;
    } catch(err) {
      console.log('Database error')
      console.log(err)
      return
    }
  }
}