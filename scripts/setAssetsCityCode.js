
const getCityCodesQuery = require('../queries/getCityCodesQuery')
// const setAssetCityCodeCommand = require('../commands/setAssetCityCodeCommand')

const normalizeCityName = (name) => name.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase()

module.exports = {
  async run() {
    console.log('Setting assets cities codes')
    try {

      // query cities with name and code
      // -- normalize cities names
      const cities = (await getCityCodesQuery.execute()).map(city => {
        return {
          cityId: city.city_id,
          cityName: normalizeCityName(city.city_name),
        }
      })
      console.log('cities', cities[0])

      // query assets: assets.seq, assets.city_name
      // -- normalize assets cities names
      const assets = []

      // for each assets seqs
      for (const asset of assets) {
        // run command(seq, city_code)
        break
      }

    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}