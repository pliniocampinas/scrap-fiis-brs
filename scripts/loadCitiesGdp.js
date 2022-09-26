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
    year: parseInt(cityCsvRow.Ano),
    greaterRegionCode: parseInt(cityCsvRow['Código da Grande Região']),
    greaterRegionName: cityCsvRow['Nome da Grande Região'],
    stateId: parseInt(cityCsvRow['Código da Unidade da Federação']),
    stateAcronym: cityCsvRow['Sigla da Unidade da Federação'],
    stateName: cityCsvRow['Nome da Unidade da Federação'],
    cidyId: parseInt(cityCsvRow['Código do Município']),
    cityName: cityCsvRow['Nome do Município'],
    metropolitanRegion: cityCsvRow['Região Metropolitana'],
    mesoRegionCode: parseInt(cityCsvRow['Código da Mesorregião']),
    mesoRegionName: cityCsvRow['Nome da Mesorregião'],
    isLegalAmazon: cityCsvRow['Amazônia Legal'],
    isSemiArid: cityCsvRow['Semiárido'],
    isSaoPauloRegion: cityCsvRow['Cidade-Região de São Paulo'],
    agroValue1000Brl: parseBrlCurrency(cityCsvRow['Valor adicionado bruto da Agropecuária, \na preços correntes\n(R$ 1.000)']),
    industryValue1000Brl: parseBrlCurrency(cityCsvRow['Valor adicionado bruto da Indústria,\na preços correntes\n(R$ 1.000)']),
    servicesValue1000Brl: parseBrlCurrency(cityCsvRow['Valor adicionado bruto dos Serviços,\na preços correntes \n- exceto Administração, defesa, educação e saúde públicas e seguridade social\n(R$ 1.000)']),
    publicExpendingValue1000Brl: parseBrlCurrency(cityCsvRow['Valor adicionado bruto da Administração, defesa, educação e saúde públicas e seguridade social, \na preços correntes\n(R$ 1.000)']),
    totalValue1000Brl: parseBrlCurrency(cityCsvRow['Valor adicionado bruto total, \na preços correntes\n(R$ 1.000)']),
    taxesValue1000Brl: parseBrlCurrency(cityCsvRow['Impostos, líquidos de subsídios, sobre produtos, \na preços correntes\n(R$ 1.000)']),
    totalGdp1000Brl: parseBrlCurrency(cityCsvRow['Produto Interno Bruto, \na preços correntes\n(R$ 1.000)']),
    gdpPerCapitaBrl: parseBrlCurrency(cityCsvRow['Produto Interno Bruto per capita, \na preços correntes\n(R$ 1,00)']),
    mostValueableSector: cityCsvRow['Atividade com maior valor adicionado bruto'],
    secondMostValueableSector: cityCsvRow['Atividade com segundo maior valor adicionado bruto'],
    thirdMostValueableSector: cityCsvRow['Atividade com terceiro maior valor adicionado bruto'],
  }
}

const fetchData = async () => {
  const csvUrl = 'https://gist.githubusercontent.com/pliniocampinas/294f89397c51d53e8d9cbcc08194938e/raw/de296ef0e50fc37fe95350011906a23e59e6e233/PIB-dos-Municipios-2010-2019.csv'
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