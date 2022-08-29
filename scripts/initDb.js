const connectionPool = require('../db/connectionPool')

const createScrappedFundsTable = async () => {
  console.log('initializing scrapped_funds')
  const sql = `
    CREATE TABLE IF NOT EXISTS scrapped_funds (
      created_on TIMESTAMP NOT NULL,
      acronym VARCHAR(10) NOT NULL,
      url TEXT,
      long_name TEXT,
      admin TEXT,
      PRIMARY KEY (created_on, acronym)
    );
  `
  try {
    await connectionPool.query(sql)
  } catch(err) {
    console.log('initializing scrapped_funds failed')
    console.log(err)
    return
  }
  console.warn('Succeeded')
}

const createScrappedAssetsTable = async () => {
  console.log('initializing scrapped_assets')
  const sql = `
    CREATE TABLE IF NOT EXISTS scrapped_assets (
      sequential SERIAL,
      fund_acronym VARCHAR(10) NOT NULL,
      title TEXT,
      address TEXT,
      neighborhood TEXT,
      city TEXT,
      state TEXT,
      square_meters INTEGER,
      created_on TIMESTAMP NOT NULL,
      PRIMARY KEY (sequential, fund_acronym)
    );
  `
  try {
    await connectionPool.query(sql)
  } catch(err) {
    console.log('initializing scrapped_assets failed')
    console.log(err)
    return
  }
  console.warn('Succeeded')
}

module.exports = {
  async run() {
    console.log('initializing tables')
    await createScrappedFundsTable()
    await createScrappedAssetsTable()
  }
}