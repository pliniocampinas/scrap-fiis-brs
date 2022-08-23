const Pool = require('pg').Pool
const pool = new Pool({
  user: 'app_user',
  host: 'localhost',
  database: 'fundsdb',
  password: 'app_user123',
  port: 5432,
})

module.exports = pool