const scrapFiis = require('./scripts/scrapFiis')
const scrapAllFunds = require('./scripts/scrapAllFunds')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Select an action: \n 1 - Scrap Fund List \n 2 - Scrap a Single Fund \n 0 - Exit \n'
});

rl.prompt();

rl.on('line', async (line) => {
  if (line.toLowerCase() === "exit" || line == "0") {
    console.log('\nExiting!\n');
    process.exit(0);        
  } else if (line.trim() === "1") {
    await scrapAllFunds.run()
  } else if (line.trim() === "2") {
    await scrapFiis.run()
  } else {
    console.log(`\n No action \n`)
  }
  rl.prompt();
}).on('close', () => {
  console.log('Exiting!');
  process.exit(0);
});