const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute({cityId, featureValue, featureName}) {
    console.log('Updating cities_coordinates, cityId: ', cityId)

    const featuresMapper = {
      'isMatopiba': 'is_matopiba',
      'isNearCoast': 'is_near_coast',
      'isSeaFront': 'is_sea_front',
    }

    const selectedFeatureField = featuresMapper[featureName]

    const sql = `
      UPDATE cities_coordinates 
      SET ${selectedFeatureField} = $1
      WHERE city_id = $2;
    `

    try {
      await connectionPool.query(sql, [
        featureValue,
        cityId,
      ])
    } catch(err) {
      console.log('Database error featureValue: ', featureValue, 'featureValue', featureValue)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}