
const fetchData = async () => {
  const csvUrl = 'https://gist.githubusercontent.com/pliniocampinas/3a0b327dbe7180dd984352e1be4b86e9/raw/4c89ca9aa4d46fbb4630e892613492e8593879b0/pib-municipios-2010-2019.csv'
}

module.exports = {
  async run() {
    console.log('Load Cities Location')
    try {
      await fetchData()
    } catch(err) {
      console.warn('Load failed')
      console.log(err)
      return
    }
    console.warn('Load suceeded')
  }
}