const connectionPool = require('../db/connectionPool')
const CityCoordinates = require('../models/CityCoordinates')

module.exports = {
  async execute(location) {
    console.log('Inserting to cities_coordinates')
  
    const sql = `
      INSERT INTO cities_coordinates (
        city_id,
        is_capital,
        city_name,
        latitude,
        longitude
      )
      VALUES ($1, $2, $3, $4, $5);
    `
    const cityCoordinates = new CityCoordinates(location)
      
    try {
      await connectionPool.query(sql, [
        cityCoordinates.cityId,
        cityCoordinates.isCapital,
        cityCoordinates.cityName,
        cityCoordinates.latitude,
        cityCoordinates.longitude,
      ])
    } catch(err) {
      console.log('Database error', cityCoordinates)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}