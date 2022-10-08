const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute() {
    console.log('Query cities_coordinates')

    const sql = `
      SELECT city_id, latitude, longitude FROM cities_coordinates
    `
    try {
      const query = await connectionPool.query(sql)
      console.log('Query returns ', query.rowCount, ' rows')
      return query.rows;
    } catch(err) {
      console.log('Database error', fund)
      console.log(err)
      return
    }
  }
}