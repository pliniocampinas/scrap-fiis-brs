const insertScrappedFundsCommand = require('../../commands/insertScrappedFundsCommand')
const getScrappedFundsQuery = require('../../queries/getScrappedFundsQuery')
const connectionPool = require('../../db/connectionPool')
const fs = require('fs')

beforeAll(() => {
  var sql = fs.readFileSync('./db/create_table_scrapped_funds.sql').toString();
  return connectionPool.query(sql)
})

afterAll(() => {
  return connectionPool.query('DROP TABLE scrapped_funds')
})

test('InsertAssetLocationCommand should insert correct data', async () => {
  const testFunds = [
    {
      url: 'funds-explorer-url',
      acronym: '_acronym_',
      longName: '_longName_',
      admin: '_admin_',
      source: 'funds-explorer',
    },
    {
      url: '_url_',
      acronym: '_acronym_',
      longName: '_longName_',
      admin: '_admin_',
      source: 'clubefii',
    },
  ]

  await insertScrappedFundsCommand.execute(testFunds)

  const rows = await getScrappedFundsQuery.execute({ source: 'funds-explorer' })

  expect(rows.length).toBe(1)
  expect(rows[0].url).toBe('funds-explorer-url')
})