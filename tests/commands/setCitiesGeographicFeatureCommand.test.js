const insertCityCoordinatesCommand = require('../../commands/insertCityCoordinatesCommand')
const setCitiesGeographicFeatureCommand = require('../../commands/setCitiesGeographicFeatureCommand')
const connectionPool = require('../../db/connectionPool')
const fs = require('fs')

beforeAll(() => {
  var sql = fs.readFileSync('./db/create_table_cities_coordinates.sql').toString();
  return connectionPool.query(sql)
})

afterAll(() => {
  return connectionPool.query('DROP TABLE cities_coordinates')
})

test('setCitiesGeographicFeatureCommand should set correct data', async () => {
  await insertCityCoordinatesCommand.execute({
    cityId: '2800308',
    isCapital: '1',
    cityName: 'Aracaju',
    longitude: '-37.0677',
    latitude: '-10.9091',
  })

  await setCitiesGeographicFeatureCommand.execute({
    cityId: '2800308',
    featureValue: true,
    featureName: 'isMatopiba'
  })

  await setCitiesGeographicFeatureCommand.execute({
    cityId: '2800308',
    featureValue: true,
    featureName: 'isNearCoast'
  })

  await setCitiesGeographicFeatureCommand.execute({
    cityId: '2800308',
    featureValue: true,
    featureName: 'isSeaFront'
  })

  const { rows } = await connectionPool.query('SELECT * FROM cities_coordinates')
  expect(rows.length).toBe(1)
  expect(rows[0].is_matopiba).toBe(true)
  expect(rows[0].is_near_coast).toBe(true)
  expect(rows[0].is_sea_front).toBe(true)
})