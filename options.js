const scrapAssetsFromFundsExplorer = require('./scripts/scrap-funds-explorer/scrapAssets')
const scrapAllFundsFromFundsExplorer = require('./scripts/scrap-funds-explorer/scrapAllFunds')
const testDb = require('./scripts/testDb')
const initDb = require('./scripts/initDb')
const normalizeAssetsFromFundsExplorer = require('./scripts/scrap-funds-explorer/normalizeAssets')

const options = [
  {
    text: 'Scrap Fund List from funds explorer',
    run: () => scrapAllFundsFromFundsExplorer.run()
  },
  {
    text: 'Scrap Fund\'s assets from funds explorer',
    run: () => scrapAssetsFromFundsExplorer.run()
  },
  {
    text: 'Test Db',
    run: () => testDb.run()
  },
  {
    text: 'Init Db',
    run: () => initDb.run()
  },
  {
    text: 'Normalize Db from funds explorer',
    run: () => normalizeAssetsFromFundsExplorer.run()
  },
].map((opc, index) => {
  return {
    value: (index+1) + '',
    ...opc
  }
})

const exitOption = {
  value: '0',
  text: 'Exit',
  run: () => console.log('Exiting!') || process.exit(0) 
}

options.push(exitOption)

module.exports = options