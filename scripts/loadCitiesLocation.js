
const axios = require('axios').default
const insertCityCoordinatesCommand = require('../commands/insertCityCoordinatesCommand')
const {parse} = require('csv-parse/sync');

const fetchData = async () => {
  // codigo_ibge,nome,latitude,longitude,capital,codigo_uf,siafi_id,ddd,fuso_horario
  const csvUrl = 'https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/csv/municipios.csv'
  const { data } = await axios.get(csvUrl)
  const records = parse(data, {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
  })
  return records
}

module.exports = {
  async run() {
    console.log('Load Cities Location')
    try {
      const citiesLocation = await fetchData()
      console.log('citiesLocation', citiesLocation.length)
      console.log('citiesLocation[0]', citiesLocation[0])
      // Insert command
      for (const city of citiesLocation) {
        await insertCityCoordinatesCommand.execute({
          cityId: city.codigo_ibge,
          cityName: city.nome,
          latitude: city.longitude,
          longitude: city.latitude,
          isCapital: city.capital
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