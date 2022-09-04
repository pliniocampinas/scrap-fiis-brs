const puppeteer = require('puppeteer')
const insertScrappedFundsCommand = require('../../commands/insertScrappedFundsCommand')

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

    await page.waitForSelector('#fiis-list-container .fund-card')

    const fundsMetaData = await page.evaluate(() => {

      const funds = []

      document.querySelectorAll('#fiis-list-container .fund-card').forEach((itemWrapper) => {
        const url = itemWrapper.querySelector('a').href??''
        const acronym = itemWrapper.querySelector('.symbol')?.innerText?.trim()??''
        const longName = itemWrapper.querySelector('.name')?.innerText?.trim()??''
        const admin = itemWrapper.querySelector('.admin')?.innerText?.trim()??''

        const fund = {
          url,
          acronym,
          longName,
          admin,
        }
  
        funds.push(fund)
      })
  
      return funds
    }, {})

    insertScrappedFundsCommand.execute(fundsMetaData)

    await browser.close()
  }
}