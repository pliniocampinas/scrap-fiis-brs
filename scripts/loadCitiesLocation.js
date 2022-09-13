
const axios = require('axios').default
var {parse} = require('csv-parse/sync');

const fetchData = async () => {
  const csvUrl = 'https://gist.githubusercontent.com/pliniocampinas/ab29c4324b36c09ed30ed330e7e1bc3b/raw/bb5ae3bbdaa8896e847015c029f0b0d501e0e844/latitude-longitude-cidades.csv'
  const { data } = await axios.get(csvUrl)
  const records = parse(data, {
    columns: true,
    delimiter: ';',
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
    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}