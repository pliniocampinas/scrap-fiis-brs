const scrapFiis = require('./scripts/scrapFiis')
const scrapAllFunds = require('./scripts/scrapAllFunds')
const missingFunds = require('./scripts/missingFunds')
const testDb = require('./scripts/testDb')
const initDb = require('./scripts/initDb')

const options = [
  {
    text: 'Scrap Fund List',
    run: () => scrapAllFunds.run()
  },
  {
    text: 'Scrap Fund\'s assets',
    run: () => scrapFiis.run()
  },
  {
    text: 'Verify missing funds',
    run: () => missingFunds.run()
  },
  {
    text: 'Test Db',
    run: () => testDb.run()
  },
  {
    text: 'Init Db',
    run: () => initDb.run()
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