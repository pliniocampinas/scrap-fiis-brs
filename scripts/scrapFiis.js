const puppeteer = require('puppeteer')
const exportCsv = require('../utils/exportCsv')
const readCsv = require('../utils/readCsv')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const navidateAndScrap = async (page, url) => {
  // Site
  console.log('Navigating to ', url)
  try {
    await page.goto(url)
  } catch(e) {
    console.warn('page.goto Error, retrying', e?.message)
    await sleep(1000)
    try {
      await page.goto(url)
    } catch(e) {
      console.warn('page.goto Error', e?.message)
      return []
    }
  }

  try {
    await page.waitForSelector('#fund-actives-items-wrapper .funds-data', {timeout: 1500})
  } catch(e) {
    console.log('waitSelector Error:' + url, e?.message)
    return []
  }

  const assetsLocation = await page.evaluate(() => {

    const assets = []

    document.querySelectorAll('#fund-actives-items-wrapper .items-wrapper:not(:first-child)').forEach((itemWrapper) => {
      const title = itemWrapper.querySelector('.title').innerText.trim()
      const listItems = [...itemWrapper.querySelectorAll('li')]
      const address = listItems.find(li => li.innerText.includes('Endereço:'))?.innerText.replace('Endereço: ', '').trim()
      const neighborhood = listItems.find(li => li.innerText.includes('Bairro:'))?.innerText.replace('Bairro: ', '').trim()
      const city = listItems.find(li => li.innerText.includes('Cidade:'))?.innerText.replace('Cidade: ', '').trim()
      const squareMeters = listItems.find(li => li.innerText.includes('Área Bruta'))?.innerText.replace('Área Bruta Locável: ', '').trim()
        
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

  return assetsLocation
}

module.exports = {
  async run() {
    console.log('Loading funds list...')
    const funds = await readCsv.readAll("./scrapped-content/funds-list.csv")

    console.log('Scrapping data...')
    const browser = await puppeteer.launch({
      args: [
        '--disable-web-security'
      ]
    })
    const page = await browser.newPage()

    const assetsLocationPerFund = []
    for (const fund of funds) {
      const assets = await navidateAndScrap(page, fund.relativeUrl)
      assets.forEach(asset => {
        asset.fund = fund.acronym
        const [city, state] = asset.city.split('-').map(i => i.trim())
        asset.city = city
        asset.state = state
        assetsLocationPerFund.push(asset)
      })
    }

    await browser.close()

    exportCsv.export("./scrapped-content/assets-location.csv", assetsLocationPerFund)
  }
}