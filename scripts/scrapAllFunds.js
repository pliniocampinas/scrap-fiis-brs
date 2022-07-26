const puppeteer = require('puppeteer')
const exportCsv = require('../utils/exportCsv')

module.exports = {
  async run() {
    console.log('Scrapping All Funds...')
    const browser = await puppeteer.launch({
      args: [
         '--disable-web-security'
      ]
    })

    const page = await browser.newPage()

    // Site
    const baseUrl = 'https://www.fundsexplorer.com.br/funds'
    console.log('Navigating to ', baseUrl)
    await page.goto(baseUrl)

    await page.waitForSelector('#fiis-list-container .item')

    const fundsMetaData = await page.evaluate(() => {

      const funds = []

      document.querySelectorAll('#fiis-list-container .item').forEach((itemWrapper) => {
        const relativeUrl = itemWrapper.querySelector('a').href??'-'
        const acronym = itemWrapper.querySelector('.symbol')?.innerText?.trim()??'-'
        const name = itemWrapper.querySelector('.name')?.innerText?.trim()??'-'
        const admin = itemWrapper.querySelector('.admin')?.innerText?.trim()??'-'

        const fund = {
          relativeUrl,
          acronym,
          name,
          admin,
        }
  
        funds.push(fund)
      })
  
      return funds
    }, {})

    exportCsv.export("./scrapped-content/funds-list.csv", fundsMetaData)

    await browser.close()
  }
}