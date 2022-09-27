const CityGdp = require('../../models/CityGdp');

test('CityCoordinates constructor should trim values', () => {
  const city = new CityGdp({
    'Código do Município': '1100015',
    'Ano': '2010',
    'Código da Grande Região': '1',
    'Nome da Grande Região': 'Norte',
    'Código da Unidade da Federação': '11',
    'Sigla da Unidade da Federação': 'RO',
    'Nome da Unidade da Federação': 'Rondônia',
    'Nome do Município': 'Alta Floresta D\'Oeste',
    'Região Metropolitana': '',
    'Código da Mesorregião': '1102',
    'Nome da Mesorregião': 'Leste Rondoniense',
    'Amazônia Legal': 'Sim',
    'Semiárido': 'Não',
    'Cidade-Região de São Paulo': 'não',
    'Valor adicionado bruto da Agropecuária, \na preços correntes\n(R$ 1.000)': '  69.260 ',
    'Valor adicionado bruto da Indústria,\na preços correntes\n(R$ 1.000)': '  16.119 ',
    'Valor adicionado bruto dos Serviços,\na preços correntes \n- exceto Administração, defesa, educação e saúde públicas e seguridade social\n(R$ 1.000)': '  62.496',
    'Valor adicionado bruto da Administração, defesa, educação e saúde públicas e seguridade social, \na preços correntes\n(R$ 1.000)': '  93.245 ',
    'Valor adicionado bruto total, \na preços correntes\n(R$ 1.000)': '  241.120 ',
    'Impostos, líquidos de subsídios, sobre produtos, \na preços correntes\n(R$ 1.000)': '  20.957 ',
    'Produto Interno Bruto, \na preços correntes\n(R$ 1.000)': '  262.077 ',
    'Produto Interno Bruto per capita, \na preços correntes\n(R$ 1,00)': '  10.731,18 ',
    'Atividade com maior valor adicionado bruto': 'Administração, defesa, educação e saúde públicas e seguridade social',
    'Atividade com segundo maior valor adicionado bruto': 'Pecuária, inclusive apoio à pecuária',
    'Atividade com terceiro maior valor adicionado bruto': 'Demais serviços',
  })
  expect(city.cidyId).toBe(1100015)
  expect(city.year).toBe(2010)
  expect(city.greaterRegionCode).toBe(1)
  expect(city.greaterRegionName).toBe('Norte')
  expect(city.stateId).toBe(11)
  expect(city.stateAcronym).toBe('RO')
  expect(city.stateName).toBe('Rondônia')
  expect(city.cityName).toBe('Alta Floresta D\'Oeste')
  expect(city.metropolitanRegion).toBe('')
  expect(city.mesoRegionCode).toBe(1102)
  expect(city.mesoRegionName).toBe('Leste Rondoniense')
  expect(city.isLegalAmazon).toBe(true)
  expect(city.isSemiArid).toBe(false)
  expect(city.isSaoPauloRegion).toBe(false)
  expect(city.agroValue1000Brl).toBe(69260)
  expect(city.industryValue1000Brl).toBe(16119)
  expect(city.servicesValue1000Brl).toBe(62496)
  expect(city.publicExpendingValue1000Brl).toBe(93245)
  expect(city.totalValue1000Brl).toBe(241120)
  expect(city.taxesValue1000Brl).toBe(20957)
  expect(city.totalGdp1000Brl).toBe(262077)
  expect(city.gdpPerCapitaBrl).toBe(10731.18)
  expect(city.mostValueableSector).toBe('Administração, defesa, educação e saúde públicas e seguridade social')
  expect(city.secondMostValueableSector).toBe('Pecuária, inclusive apoio à pecuária')
  expect(city.thirdMostValueableSector).toBe('Demais serviços')
})