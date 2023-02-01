const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute() {
    console.log('Query city codes')

    const sql = `
      SELECT city_id, city_name
      FROM cities_population
      WHERE year = 2021;
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