const insertCityCoordinatesCommand = require('../../commands/insertCityCoordinatesCommand')
const setCitiesDistancesCommand = require('../../commands/setCitiesDistancesCommand')
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
    cityId: '2800308',
    isCapital: '1',
    cityName: 'Aracaju',
    longitude: '-37.0677',
    latitude: '-10.9091',
  })

  await setCitiesDistancesCommand.execute({
    cityId: '2800308',
    longitude: -37.0677,
    latitude: -10.9091,
  })

  const { rows } = await connectionPool.query('SELECT * FROM cities_coordinates')
  expect(rows.length).toBe(1)
  expect(parseFloat(rows[0].distance_equator_km)).toBe(1214)
})