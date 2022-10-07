const insertCityPopulationCommand = require('../../commands/insertCityPopulationCommand')
const connectionPool = require('../../db/connectionPool')
const fs = require('fs')

beforeAll(() => {
  var sql = fs.readFileSync('./db/create_table_cities_population.sql').toString();
  return connectionPool.query(sql)
})

afterAll(() => {
  return connectionPool.query('DROP TABLE cities_population')
})

test('insertCityPopulationCommand should insert correct data', async () => {
  await insertCityPopulationCommand.execute({
    'UF': '  SP  ',
    'COD. UF': '  11  ',
    'COD. MUNIC': '  00123  ',
    'NOME DO MUNICÍPIO': '  São Paulo  ',
    'POPULAÇÃO ESTIMADA': '  12.000.123  ',
  }, 2020)

  const { rows } = await connectionPool.query('SELECT * FROM cities_population')
  expect(rows.length).toBe(1)
  expect(rows[0].year).toBe(2020)
  expect(rows[0].city_id).toBe(1100123)
  expect(rows[0].city_name).toBe('São Paulo')
  expect(rows[0].state_acronym).toBe('SP')
  expect(rows[0].estimate_population).toBe(12000123)
})