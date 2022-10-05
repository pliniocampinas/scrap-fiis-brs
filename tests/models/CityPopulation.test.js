const CityPopulation = require('../../models/CityPopulation');

test('CityPopulation constructor should trim values and parse population to integer correctly', () => {
  const cityCoordinates = new CityPopulation({
    'UF': '  RO  ',
    'COD. UF': '  11  ',
    'COD. MUNIC': '  00015  ',
    'NOME DO MUNICÍPIO': '  Alta Floresta D\'Oeste  ',
    'POPULAÇÃO ESTIMADA': '  22.945  ',
  }, 2020)
  expect(cityCoordinates.cityId).toBe(1100015)
  expect(cityCoordinates.stateAcronym).toBe('RO')
  expect(cityCoordinates.cityName).toBe('Alta Floresta D\'Oeste')
  expect(cityCoordinates.population).toBe(22945)
  expect(cityCoordinates.year).toBe(2020)
})

test('CityPopulation constructor should parse population with space before the key and big numbers correctly', () => {
  const cityCoordinates = new CityPopulation({
    'UF': '  RO  ',
    'COD. UF': '  11  ',
    'COD. MUNIC': '  00015  ',
    'NOME DO MUNICÍPIO': '  Alta Floresta D\'Oeste  ',
    ' POPULAÇÃO ESTIMADA': '  2.000.945  ',
  }, 2020)
  expect(cityCoordinates.cityId).toBe(1100015)
  expect(cityCoordinates.stateAcronym).toBe('RO')
  expect(cityCoordinates.cityName).toBe('Alta Floresta D\'Oeste')
  expect(cityCoordinates.population).toBe(2000945)
  expect(cityCoordinates.year).toBe(2020)
})