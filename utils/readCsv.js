var fs = require('fs').promises;
var {parse} = require('csv-parse/sync');

module.exports = {
  async readAll(fileName) {
    const fileContent = await fs.readFile(fileName);
    const records = parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });
    return records
  }
}