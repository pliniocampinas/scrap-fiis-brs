const fs = require('fs')

module.exports = {
  export(filePath, list, stringfyListItem) {
    // Export json/xls
    let csvContent = ''
    list.forEach(function(item) {
        let row = stringfyListItem(item)
        csvContent += row + "\r\n";
    }); 

    fs.writeFile(filePath, csvContent, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Arquivo Salvo!");
    });
  }
}