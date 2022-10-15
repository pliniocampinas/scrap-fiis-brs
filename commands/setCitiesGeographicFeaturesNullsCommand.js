const connectionPool = require('../db/connectionPool')

module.exports = {
  async execute(featureName) {
    console.log('Setting cities_coordinates null values to false: ')

    const featuresMapper = {
      'isMatopiba': 'is_matopiba',
      'isNearCoast': 'is_near_coast',
      'isSeaFront': 'is_sea_front',
    }

    const selectedFeatureField = featuresMapper[featureName]

    const sql = `
      UPDATE cities_coordinates 
      SET ${selectedFeatureField} = false
      WHERE ${selectedFeatureField} IS NULL;
    `

    try {
      await connectionPool.query(sql)
    } catch(err) {
      console.log('Database error featureName: ', featureName)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}