const getScrappedFundsQuery = require('../../queries/getScrappedFundsQuery')
const insertScrappedAssetsCommand = require('../../commands/insertScrappedAssetsCommand')
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

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
    await page.waitForSelector('a[href="#imoveis"', {timeout: 1500})
  } catch(e) {
    console.log('waitSelector Error:' + url, e?.message)
    return []
  }

  try {
    await page.click('a[href="#imoveis"')
    await page.waitForSelector('#tabela_documentos_tb', {timeout: 2500})
  } catch(e) {
    console.log('click imoveis and waitSelector Error:' + url, e?.message)
    return []
  }

  const assetsLocation = await page.evaluate(() => {

    const assets = []

    document.querySelectorAll('#tabela_documentos_tb tbody tr')?.forEach((row) => {
      const cells = [...row.querySelectorAll('td')]
      const title = cells[0].innerText.trim()
      const squareMeters = cells[5].innerText.trim()
        
      const assetData = {
        title,
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
    
    const funds = await getScrappedFundsQuery.execute({ source: 'clubefii' })

    console.log('Scrapping data...')
    const browser = await puppeteer.launch({
      args: [
        '--disable-web-security'
      ]
    })
    const page = await browser.newPage()

    const assetsLocationPerFund = []
    for (const fund of funds) {
      const assets = await navidateAndScrap(page, fund.url)
      console.log('assets', assets)
      assets.forEach(asset => {
        asset.fundAcronym = fund.acronym
        asset.source = 'clubefii',
        assetsLocationPerFund.push(asset)
      })
      insertScrappedAssetsCommand.execute(assets)
    }

    await browser.close()
  }
}