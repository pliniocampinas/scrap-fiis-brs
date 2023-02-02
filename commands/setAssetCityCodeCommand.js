const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute({ assetSequential, cityId }) {
    console.log('Updating cities_coordinates, cityId: ', cityId)

    const sql = `
      UPDATE scrapped_assets 
      SET city_id = $1
      WHERE sequential = $2;
    `

    try {
      await connectionPool.query(sql, [
        cityId,
        assetSequential,
      ])
    } catch(err) {
      console.log('Database error')
      console.log(err)
      return
    }

    console.log('Updated', cityId)
  }
}