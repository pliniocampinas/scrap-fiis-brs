const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute() {
    console.log('Query scrapped_funds')

    const sql = `
      SELECT acronym, url
      FROM scrapped_funds as sf
      WHERE sf.created_on = (
        SELECT created_on 
        FROM scrapped_funds as sf2 
        ORDER BY created_on DESC
        LIMIT 1
      );
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