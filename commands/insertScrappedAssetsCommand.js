const connectionPool = require('../db/connectionPool')
const Asset = require('../models/Asset')

module.exports = {
  async execute(scrappedAssets) {
    console.log('Inserting to scrapped_assets')

    const sql = `
      INSERT INTO scrapped_assets (fund_acronym, title, address, neighborhood, city, state, square_meters, source, created_on)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `
    const currentDate = new Date()
    scrappedAssets.forEach(async scrappedAsset => {

      const asset = new Asset(scrappedAsset)
      
      const validation = asset.validade()
      if(validation.isValid === false) {
        console.log('Validation Error', validation.error)
        return
      }

      try {
        await connectionPool.query(sql, [
          asset.fundAcronym,
          asset.title,
          asset.address,
          asset.neighborhood,
          asset.city,
          asset.state,
          asset.squareMeters,
          asset.source,
          currentDate,
        ])
      } catch(err) {
        console.log('Database error', fund)
        console.log(err)
        return
      }
    });
    console.log('Inserted')
  }
}