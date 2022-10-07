const connectionPool = require('../db/connectionPool')
const CityPopulation = require('../models/CityPopulation')

module.exports = {
  async execute(population, year) {
    console.log('Inserting to cities_population')
  
    const sql = `
      INSERT INTO cities_population (
        year,
        city_id,
        city_name,
        state_acronym,
        estimate_population
      )
      VALUES ($1, $2, $3, $4, $5);
    `
    const cityPopulation = new CityPopulation(population, year)
    
    try {
      await connectionPool.query(sql, [
        cityPopulation.year,
        cityPopulation.cityId,
        cityPopulation.cityName,
        cityPopulation.stateAcronym,
        cityPopulation.population,
      ])
    } catch(err) {
      console.log('Database error', cityPopulation)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}