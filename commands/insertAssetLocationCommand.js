const connectionPool = require('../db/connectionPool')
const AssetLocation = require('../models/AssetLocation')

module.exports = {
  async execute(location) {
    console.log('Inserting to assets_location')
  
    const sql = `
      INSERT INTO assets_location (asset_sequential, input_text, out_formatted_address, out_name, out_place_id, out_latitude, out_longitude, created_on)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `
    const currentDate = new Date()
    const assetLocation = new AssetLocation(location)
      
    try {
      await connectionPool.query(sql, [
        assetLocation.assetSequential,
        assetLocation.inputText,
        assetLocation.outFormattedAddress,
        assetLocation.outName,
        assetLocation.outPlaceId,
        assetLocation.outLatitude,
        assetLocation.outLongitude,
        currentDate,
      ])
    } catch(err) {
      console.log('Database error', fund)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}