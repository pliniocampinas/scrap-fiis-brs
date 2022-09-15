const connectionPool = require('../db/connectionPool')
var fs = require('fs');

const runScript = async (filePath) => {
  console.log('running script', filePath)
  var sql = fs.readFileSync(filePath).toString();
  try {
    await connectionPool.query(sql)
  } catch(err) {
    console.log('running script', filePath, 'failed')
    console.log(err)
    return
  }
}

module.exports = {
  async run() {
    console.log('initializing tables')
    await runScript('./db/create_table_scrapped_funds.sql')
    await runScript('./db/create_table_scrapped_assets.sql')
    await runScript('./db/create_table_assets_location.sql')
    await runScript('./db/create_table_cities_coordinates.sql')
  }
}