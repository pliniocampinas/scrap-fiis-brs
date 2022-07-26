const puppeteer = require('puppeteer')
const exportCsv = require('../utils/exportCsv')
const readCsv = require('../utils/readCsv')

const navidateAndScrap = async (page, url) => {
  // Site
  console.log('Navigating to ', url)
  await page.goto(url)

  await page.waitForSelector('#fund-actives-items-wrapper .funds-data', {timeout: 2500})

  const assetsLocation = await page.evaluate(() => {

    const assets = []

    document.querySelectorAll('#fund-actives-items-wrapper .items-wrapper:not(:first-child)').forEach((itemWrapper) => {
      const title = itemWrapper.querySelector('.title').innerText
      const listItems = [...itemWrapper.querySelectorAll('li')]
      const address = listItems.find(li => li.innerText.includes('Endereço'))?.innerText.replace('Endereço: ', '')
      const neighborhood = listItems.find(li => li.innerText.includes('Bairro'))?.innerText.replace('Bairro: ', '')
      const city = listItems.find(li => li.innerText.includes('Cidade'))?.innerText.replace('Cidade: ', '')
      const squareMeters = listItems.find(li => li.innerText.includes('Área Bruta'))?.innerText.replace('Área Bruta Locável: ', '')
        
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

  exportCsv.export("./scrapped-content/assets-location.csv", assetsLocation.map(asset => {

    const [city, state] = asset.city.split('-').map(i => i.trim())

    return {
      title: asset.title,
      address: asset.address,
      neighborhood: asset.neighborhood,
      squareMeters: asset.squareMeters,
      city,
      state,
    }
  }))
}

module.exports = {
  async run() {
    console.log('Scrapping data...')
    const browser = await puppeteer.launch({
      args: [
         '--disable-web-security'
      ]
    })

    const test = await readCsv.readAll("./scrapped-content/assets-location.csv")

    const page = await browser.newPage()

    await navidateAndScrap(page, 'https://www.fundsexplorer.com.br/funds/abcp11')

    await browser.close()
  }
}