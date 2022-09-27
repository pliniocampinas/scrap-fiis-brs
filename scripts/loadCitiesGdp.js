const axios = require('axios').default
var {parse} = require('csv-parse/sync');

const fetchData = async () => {
  const csvUrl = 'https://gist.githubusercontent.com/pliniocampinas/294f89397c51d53e8d9cbcc08194938e/raw/de296ef0e50fc37fe95350011906a23e59e6e233/PIB-dos-Municipios-2010-2019.csv'
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
    console.log('Loading Cities Gdp data')
    try {
      const citiesAndGdp = await fetchData()
      console.log('citiesAndGdp', citiesAndGdp.length)
      console.log('citiesAndGdp[0]', citiesAndGdp[0])
      // Insert command
    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}