const connectionPool = require('../db/connectionPool')
const CityGdp = require('../models/CityGdp')

module.exports = {
  async execute(cty) {
    console.log('Inserting to cities_gdp')
  
    const sql = `
      INSERT INTO cities_coordinates (
        year,
        city_id,
        greater_region_code,
        greater_region_name,
        state_id,
        state_acronym,
        state_name,
        city_name,
        metropolitan_region,
        meso_region_code,
        meso_region_name,
        is_legal_amazon,
        is_semi_arid,
        is_sao_paulo_region,
        agro_value_1000_brl,
        industry_value_1000_brl,
        services_value_1000_brl,
        public_expending_value_1000_brl,
        total_value_1000_brl,
        taxes_value_1000_brl,
        total_gdp_1000_brl,
        gdp_per_capita_brl,
        most_valueable_sector,
        second_most_valueable_sector,
        third_most_valueable_sector,
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
        $21, $22, $23, $24, $25 
      );
    `
    const city = new CityGdp(cty)
      
    try {
      await connectionPool.query(sql, [
        city.year,
        city.cidyId,
        city.greaterRegionCode,
        city.greaterRegionName,
        city.stateId,
        city.stateAcronym,
        city.stateName,
        city.cityName,
        city.metropolitanRegion,
        city.mesoRegionCode,
        city.mesoRegionName,
        city.isLegalAmazon,
        city.isSemiArid,
        city.isSaoPauloRegion,
        city.agroValue1000Brl,
        city.industryValue1000Brl,
        city.servicesValue1000Brl,
        city.publicExpendingValue1000Brl,
        city.totalValue1000Brl,
        city.taxesValue1000Brl,
        city.totalGdp1000Brl,
        city.gdpPerCapitaBrl,
        city.mostValueableSector,
        city.secondMostValueableSector,
        city.thirdMostValueableSector,
      ])
    } catch(err) {
      console.log('Database error', city)
      console.log(err)
      return
    }

    console.log('Inserted')
  }
}