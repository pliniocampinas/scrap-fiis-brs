const insertScrappedFundsCommand = require('../../commands/insertScrappedFundsCommand')
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

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
    const baseUrl = 'https://www.clubefii.com.br/fundo_imobiliario_lista'
    console.log('Navigating to ', baseUrl)
    await page.goto(baseUrl)
    
    await page.waitForSelector('.tabela_principal')

    const fundsMetaData = await page.evaluate(() => {
      const funds = []

      document.querySelectorAll('.tabela_principal tbody tr').forEach((row) => {
        const cells = [...row.querySelectorAll('td')]
        const url = row.querySelector('td a')?.href??''
        const acronym = cells[0]?.innerText?.trim()??''
        const longName = cells[1]?.innerText?.trim()??''
        const admin = cells[6]?.innerText?.trim()??''

        const fund = {
          url,
          acronym,
          longName,
          admin,
          source: 'clubefii',
        }
  
        funds.push(fund)
      })
  
      return funds
    }, {})

    console.log('Scrapped', fundsMetaData.length, 'funds')
    insertScrappedFundsCommand.execute(fundsMetaData)

    await browser.close()
  }
}