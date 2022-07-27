const scrapFiis = require('./scripts/scrapFiis')
const scrapAllFunds = require('./scripts/scrapAllFunds')

const options = [
  {
    value: '1',
    text: 'Scrap Fund List',
    run: () => scrapAllFunds.run()
  },
  {
    value: '2',
    text: 'Scrap Fund\'s assets',
    run: () => scrapFiis.run()
  },
  {
    value: '0',
    text: 'Exit',
    run: () => console.log('Exiting!') || process.exit(0) 
  },
]

optionsText = 'Select an action: \n' + options.map(opt => `${opt.value} - ${opt.text}\n`).join('')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: optionsText
})

rl.prompt()

rl.on('line', async (line) => {
  const selectedOption = options.find(op => op.value == line.toLowerCase())
  if(selectedOption) {
    await selectedOption.run()
  } else {
    console.log(`\n No action \n`)
  }
  
  rl.prompt();
}).on('close', () => {
  console.log('Exiting!')
  process.exit(0)
})