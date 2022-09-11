const insertAssetLocationCommand = require('../../commands/insertAssetLocationCommand')
const connectionPool = require('../../db/connectionPool')
const fs = require('fs')

beforeAll(() => {
  var sql = fs.readFileSync('./db/create_table_assets_location.sql').toString();
  return connectionPool.query(sql)
})

afterAll(() => {
  return connectionPool.query('DROP TABLE assets_location')
})

test('InsertAssetLocationCommand should insert correct data', async () => {
  await insertAssetLocationCommand.execute({
    assetSequential: 123,
    inputText: 'inputText',
    outFormattedAddress: 'outFormattedAddress',
    outName: 'outName',
    outPlaceId: 'outPlaceId',
    outLatitude: 'outLatitude',
    outLongitude: 'outLongitude',
  })

  const { rows } = await connectionPool.query('SELECT * FROM assets_location')
  expect(rows.length).toBe(1)
  expect(rows[0].asset_sequential).toBe(123)
  expect(rows[0].input_text).toBe('inputText')
  expect(rows[0].out_formatted_address).toBe('outFormattedAddress')
  expect(rows[0].out_name).toBe('outName')
  expect(rows[0].out_place_id).toBe('outPlaceId')
  expect(rows[0].out_latitude).toBe('outLatitude')
  expect(rows[0].out_longitude).toBe('outLongitude')
})