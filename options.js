const scrapAssetsFromFundsExplorer = require('./scripts/scrap-funds-explorer/scrapAssets')
const scrapAllFundsFromFundsExplorer = require('./scripts/scrap-funds-explorer/scrapAllFunds')
const testDb = require('./scripts/testDb')
const initDb = require('./scripts/initDb')
const normalizeAssetsFromFundsExplorer = require('./scripts/scrap-funds-explorer/normalizeAssets')
const scrapAllFundsFromClubeFii = require('./scripts/scrap-clubefii/scrapAllFunds')
const scrapAssetsFromClubeFii = require('./scripts/scrap-clubefii/scrapAssets')
const testPlacesApi = require('./scripts/testPlacesApi')
const loadCitiesGdp = require('./scripts/loadCitiesGdp')
const loadCitiesLocation = require('./scripts/loadCitiesLocation')
const loadCitiesPopulation = require('./scripts/loadCitiesPopulation')
const calculateCitiesDistances = require('./scripts/calculateCitiesDistances')

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
    text: 'Scrap Fund List from clube fii',
    run: () => scrapAllFundsFromClubeFii.run()
  },
  {
    text: 'Scrap Fund\'s assets from clube fii',
    run: () => scrapAssetsFromClubeFii.run()
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
  {
    text: 'Test Places Api',
    run: () => testPlacesApi.run()
  },
  {
    text: 'Load Cities Gdp',
    run: () => loadCitiesGdp.run()
  },
  {
    text: 'Load Cities Location',
    run: () => loadCitiesLocation.run()
  },
  {
    text: 'Load Cities Population',
    run: () => loadCitiesPopulation.run()
  },
  {
    text: 'Calc Cities Distances',
    run: () => calculateCitiesDistances.run()
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