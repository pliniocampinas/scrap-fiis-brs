
const getCitiesCoordinatesQuery = require('../queries/getCitiesCoordinatesQuery')

module.exports = {
  async run() {
    console.log('Calculating Cities distance from equator')
    try {
      const citiesLocation = await getCitiesCoordinatesQuery.execute()
      console.log('citiesLocation', citiesLocation.length)
      console.log('citiesLocation[0]', citiesLocation[0])
      
      // Insert command
      // for (const city of citiesLocation) {
      //   await setDistancesCommand.execute(citiesLocation.city_id, citiesLocation.latitude, citiesLocation.longitude)
      // }
    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}