const connectionPool = require('../db/connectionPool')
var fs = require('fs');

const runScript = async (fileName) => {
  console.log('running script', fileName)
  var sql = fs.readFileSync(fileName).toString();
  try {
    await connectionPool.query(sql)
  } catch(err) {
    console.log('running script', fileName, 'failed')
    console.log(err)
    return
  }
}

module.exports = {
  async run() {
    console.log('initializing tables')
    await runScript('create_table_scrapped_funds.sql')
    await runScript('create_table_scrapped_assets.sql')
  }
}