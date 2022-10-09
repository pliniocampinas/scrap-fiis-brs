const connectionPool = require('../db/connectionPool')
const haversine = require('haversine-distance')

module.exports = {
  async execute({ cityId, latitude, longitude }) {
    console.log('Updating cities_coordinates, cityId: ', cityId)

    const cityCoordinates = { latitude, longitude }
    const equator = { latitude: 0.00001, longitude: longitude }
    const distanceFromEquatorKilometers = haversine(cityCoordinates, equator) / 1000
     
    const sql = `
      UPDATE cities_coordinates 
      SET distance_equator_km = $1
      WHERE city_id = $2;
    `

    try {
      await connectionPool.query(sql, [
        Math.trunc(distanceFromEquatorKilometers),
        cityId,
      ])
    } catch(err) {
      console.log('Database error', distanceFromEquatorKilometers)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}