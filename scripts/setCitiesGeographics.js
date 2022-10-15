
const setCitiesGeographicFeatureCommand = require('../commands/setCitiesGeographicFeatureCommand')

const fetchData = async (csvUrl) => {
  const { data } = await axios.get(csvUrl)
  const records = parse(data, {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
  });
  return records
}

module.exports = {
  async run() {
    const featuresSources = [
      {
        cityIdLabel: 'CD_MUN',
        featureName: 'isMatopiba',
        csvUrl: ''
      },
      {
        cityIdLabel: 'CD_MUN',
        featureName: 'isNearCoast',
        csvUrl: ''
      },
      {
        cityIdLabel: 'CD_MUN',
        featureName: 'isSeaFront',
        csvUrl: ''
      },
    ]
    
    console.log('Setting Cities geographic data')
    try {
      
      for (const source of featuresSources) {
        console.log('fetching source', source.featureName)
        const citiesWithFeature = await fetchData(source.csvUrl)
        console.log('citiesWithFeature found: ', citiesWithFeature.length)
        console.log('First: ', citiesWithFeature[0])
        for (const cityWithFeature of citiesWithFeature) {
          // Insert command
          await setCitiesGeographicFeatureCommand.execute({
            cityId: cityWithFeature[source.cityIdLabel],
            featureName: source.featureName,
            featureValue: true,
          })
        }
      }
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