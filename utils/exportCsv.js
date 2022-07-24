const fs = require('fs')

function convertToCSV(objArray, delimiter = ';') {
  const objArrayWithHeaders = [Object.keys(objArray[0]), ...objArray]
  var array = typeof objArrayWithHeaders != 'object' ? JSON.parse(objArrayWithHeaders) : objArrayWithHeaders
  var str = ''

  for (var i = 0; i < array.length; i++) {
    var line = ''
    for (var index in array[i]) {
      if (line != '') line += delimiter

      line += array[i][index]
    }

    str += line + '\r\n'
  }

  return str
}

module.exports = {
  export(filePath, list) {
    const csvContent = convertToCSV(list)

    fs.writeFile(filePath, csvContent, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("File saved!");
    });
  }
}