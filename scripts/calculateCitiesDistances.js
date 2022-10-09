
const getCitiesCoordinatesQuery = require('../queries/getCitiesCoordinatesQuery')
const setCitiesDistancesCommand = require('../commands/setCitiesDistancesCommand')

module.exports = {
  async run() {
    console.log('Calculating Cities distance from equator')
    try {
      const citiesLocation = await getCitiesCoordinatesQuery.execute()
      console.log('citiesLocation', citiesLocation.length)
      console.log('citiesLocation[0]', citiesLocation[0])
      
      // Insert command
      for (const city of citiesLocation) {
        await setCitiesDistancesCommand.execute({
          cityId: city.city_id, 
          latitude: parseFloat(city.latitude), 
          longitude: parseFloat(city.longitude)
        })
      }
    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}