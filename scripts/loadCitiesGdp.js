const axios = require('axios').default
var {parse} = require('csv-parse/sync');

const parseBrlCurrency = (currency) => {
  return parseFloat(
    currency
      .replace('.', '')
      .replace(',', '.')
  )
}

const schemaToData = (cityCsvRow) => {
  return {
    year: parseInt(cityCsvRow.ano),
    gdpThousandsBrl: parseFloat(cityCsvRow.pib_bruto_1000brl),
    gdpPerCapitaBrl: parseBrlCurrency(cityCsvRow.pib_per_capita_1brl),
    state: cityCsvRow.sigla_uf,
    code: cityCsvRow.codigo_municipio,
    name: cityCsvRow.nome_municipio
  }
}

const fetchData = async () => {
  const csvUrl = 'https://gist.githubusercontent.com/pliniocampinas/3a0b327dbe7180dd984352e1be4b86e9/raw/4c89ca9aa4d46fbb4630e892613492e8593879b0/pib-municipios-2010-2019.csv'
  const { data } = await axios.get(csvUrl)
  const records = parse(data, {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
  });
  return records.map(city => schemaToData(city))
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