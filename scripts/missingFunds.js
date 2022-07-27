const exportCsv = require('../utils/exportCsv')
const readCsv = require('../utils/readCsv')

module.exports = {
  async run() {
    console.log('Loading funds list...')
    const assets = await readCsv.readAll("./scrapped-content/assets-location.csv", ',')
    const funds = await readCsv.readAll("./scrapped-content/funds-list.csv")

    let uniqueFundsScrapped = [...new Set(assets.map(asset => asset['fund '].trim()))]

    const notScrappedFunds = funds.filter(fund => uniqueFundsScrapped.includes(fund.acronym) === false)

    console.log('notScrappedFunds', notScrappedFunds.length)
    exportCsv.export("./scrapped-content/not-scrapped-funds.csv", notScrappedFunds)
  }
}