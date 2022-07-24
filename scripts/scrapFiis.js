const puppeteer = require('puppeteer')
const exportCsv = require('../utils/exportCsv')

module.exports = {
  async run() {
    console.log('Buscando dados...')
    const browser = await puppeteer.launch({
      args: [
         '--disable-web-security'
      ]
    })

    const page = await browser.newPage()

    // Site
    const baseUrl = 'https://www.fundsexplorer.com.br/funds/rbrp11'
    console.log('Navegando para ', baseUrl)
    await page.goto(baseUrl)

    await page.waitForSelector('#fund-actives-items-wrapper .funds-data')

    const assetsLocation = await page.evaluate(() => {

      const assets = []

      document.querySelectorAll('#fund-actives-items-wrapper .items-wrapper:not(:first-child)').forEach((itemWrapper) => {
        const title = itemWrapper.querySelector('.title').innerText
        const listItems = [...itemWrapper.querySelectorAll('li')]

        const address = listItems.find(li => li.innerText.includes('Endereço'))?.innerText
        const neighborhood = listItems.find(li => li.innerText.includes('Bairro'))?.innerText
        const city = listItems.find(li => li.innerText.includes('Cidade'))?.innerText
        const squareMeters = listItems.find(li => li.innerText.includes('Área Bruta'))?.innerText
         
        const assetData = {
          title,
          address,
          neighborhood,
          city,
          squareMeters,
        }
  
        assets.push(assetData)
      })
  
      return assets
    }, {})

    exportCsv.export("./scrapped-content/assets-location.csv", assetsLocation, item => JSON.stringify(item))

    await browser.close()
  }
}