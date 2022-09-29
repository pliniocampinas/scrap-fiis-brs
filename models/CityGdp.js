const parseBrlCurrency = (currency) => {
  return parseFloat(
    currency
      ?.replace('.', '')
      ?.replace(',', '.')
      ?.replace('(', '')
      ?.replace(')', '')
  ) || 0
}

const parseToBoolean = (yesOrNo) => {
  const yesOrNoNormalized = yesOrNo?.toLowerCase()?.trim() || ''
  if(yesOrNoNormalized === 'sim') {
    return true
  }

  if(yesOrNoNormalized === 'não') {
    return false
  }

  return null
}

class CityGdp {
  constructor(cityCsvRow) {
    this.cidyId = parseInt(cityCsvRow['Código do Município']) || 0
    this.year = parseInt(cityCsvRow.Ano) || 0
    this.greaterRegionCode = parseInt(cityCsvRow['Código da Grande Região']) || 0
    this.greaterRegionName = cityCsvRow['Nome da Grande Região']?.trim() || ''
    this.stateId = parseInt(cityCsvRow['Código da Unidade da Federação']) || 0
    this.stateAcronym = cityCsvRow['Sigla da Unidade da Federação']?.trim() || ''
    this.stateName = cityCsvRow['Nome da Unidade da Federação']?.trim() || ''
    this.cityName = cityCsvRow['Nome do Município']?.trim() || ''
    this.metropolitanRegion = cityCsvRow['Região Metropolitana']?.trim() || ''
    this.mesoRegionCode = parseInt(cityCsvRow['Código da Mesorregião']) || 0
    this.mesoRegionName = cityCsvRow['Nome da Mesorregião']?.trim() || ''
    this.isLegalAmazon = parseToBoolean(cityCsvRow['Amazônia Legal'])
    this.isSemiArid = parseToBoolean(cityCsvRow['Semiárido'])
    this.isSaoPauloRegion = parseToBoolean(cityCsvRow['Cidade-Região de São Paulo'])
    this.agroValue1000Brl = parseBrlCurrency(cityCsvRow['Valor adicionado bruto da Agropecuária, \na preços correntes\n(R$ 1.000)'])
    this.industryValue1000Brl = parseBrlCurrency(cityCsvRow['Valor adicionado bruto da Indústria,\na preços correntes\n(R$ 1.000)'])
    this.servicesValue1000Brl = parseBrlCurrency(cityCsvRow['Valor adicionado bruto dos Serviços,\na preços correntes \n- exceto Administração, defesa, educação e saúde públicas e seguridade social\n(R$ 1.000)'])
    this.publicExpendingValue1000Brl = parseBrlCurrency(cityCsvRow['Valor adicionado bruto da Administração, defesa, educação e saúde públicas e seguridade social, \na preços correntes\n(R$ 1.000)'])
    this.totalValue1000Brl = parseBrlCurrency(cityCsvRow['Valor adicionado bruto total, \na preços correntes\n(R$ 1.000)'])
    this.taxesValue1000Brl = parseBrlCurrency(cityCsvRow['Impostos, líquidos de subsídios, sobre produtos, \na preços correntes\n(R$ 1.000)'])
    this.totalGdp1000Brl = parseBrlCurrency(cityCsvRow['Produto Interno Bruto, \na preços correntes\n(R$ 1.000)'])
    this.gdpPerCapitaBrl = parseBrlCurrency(cityCsvRow['Produto Interno Bruto per capita, \na preços correntes\n(R$ 1,00)'])
    this.mostValueableSector = cityCsvRow['Atividade com maior valor adicionado bruto']?.trim() || ''
    this.secondMostValueableSector = cityCsvRow['Atividade com segundo maior valor adicionado bruto']?.trim() || ''
    this.thirdMostValueableSector = cityCsvRow['Atividade com terceiro maior valor adicionado bruto']?.trim() || ''
  }
}

module.exports = CityGdp