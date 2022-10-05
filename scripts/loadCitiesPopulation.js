const axios = require('axios').default
// const insertCityPopulationCommand = require('../commands/insertCityPopulationCommand')
const {parse} = require('csv-parse/sync');

const fetchData = async (year) => {
  const csvRootUrl = 'https://gist.githubusercontent.com/pliniocampinas/eb6195f3a270cd7d261e0e53cf8774d4/raw/1f9106e2b1363423bf5975a7a81fed0e968fe772'
  const { data } = await axios.get(`${csvRootUrl}/estimativa_${year}.csv`)
  const records = parse(data, {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
  });
  return records
}

module.exports = {
  async run() {
    console.log('Loading Cities Population data')

    const yearsAvailable = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]

    try {
      for (const year of yearsAvailable) {
        const citiesPopulationEstimatives = await fetchData(year)
        console.log('citiesPopulationEstimatives found: ', citiesPopulationEstimatives.length)
        console.log('First: ', citiesPopulationEstimatives[0])
        // for (const year of citiesPopulationEstimatives) {
        //   // Insert command
        //   // await insertCityPopulationCommand.execute(city)
        // }
      }
    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}