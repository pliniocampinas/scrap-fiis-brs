const insertCityCoordinatesCommand = require('../../commands/insertCityCoordinatesCommand')
const connectionPool = require('../../db/connectionPool')
const fs = require('fs')

beforeAll(() => {
  var sql = fs.readFileSync('./db/create_table_cities_coordinates.sql').toString();
  return connectionPool.query(sql)
})

afterAll(() => {
  return connectionPool.query('DROP TABLE cities_coordinates')
})

test('insertCityCoordinatesCommand should insert correct data', async () => {
  await insertCityCoordinatesCommand.execute({
    cityId: '123',
    stateAcronym: 'SP',
    cityName: 'São Paulo',
    latitude: 'latitude',
    longitude: 'longitude',
  })

  const { rows } = await connectionPool.query('SELECT * FROM cities_coordinates')
  expect(rows.length).toBe(1)
  expect(rows[0].city_id).toBe(123)
  expect(rows[0].state_acronym).toBe('SP')
  expect(rows[0].city_name).toBe('São Paulo')
  expect(rows[0].latitude).toBe('latitude')
  expect(rows[0].longitude).toBe('longitude')
})