
const getCityCodesQuery = require('../queries/getCityCodesQuery')
const getScrappedAssetsQuery = require('../queries/getScrappedAssetsQuery')
const setAssetCityCodeCommand = require('../commands/setAssetCityCodeCommand')

const normalizeCityName = (name) => name.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase()

module.exports = {
  async run() {
    console.log('Setting assets cities codes')
    try {

      const cities = (await getCityCodesQuery.execute()).map(city => {
        return {
          cityId: city.city_id,
          cityName: normalizeCityName(city.city_name),
        }
      })
      console.log('cities', cities[0])

      const assets = (await getScrappedAssetsQuery.execute()).map(assset => {
        return {
          sequential: assset.sequential,
          cityName: normalizeCityName(assset.city),
        }
      })
      console.log('assets', assets[0])

      for (const asset of assets) {
        const city = cities.find(city => city.cityName === asset.cityName)
        if(!city) {
          console.warn('cityId not found, assetCityName:', asset.cityName)
        }
        await setAssetCityCodeCommand.execute({
          cityId: city.cityId,
          assetSequential: asset.sequential
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