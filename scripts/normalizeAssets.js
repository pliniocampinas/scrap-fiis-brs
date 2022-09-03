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
    await runScript('./db/normalize_assets.sql')
  }
}