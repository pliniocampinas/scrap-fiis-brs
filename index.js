require('dotenv').config();
const options = require('./options')

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
    try {
      await selectedOption.run()
    } catch(err) {
      console.log('Unhandled error', err)
    }
  } else {
    console.log(`\n No action \n`)
  }
  
  rl.prompt();
}).on('close', () => {
  console.log('Exiting!')
  process.exit(0)
})