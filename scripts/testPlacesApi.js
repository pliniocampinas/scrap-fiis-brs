const axios = require('axios').default;

const getAPI = async () => {
  console.log('PLACES_API_KEY', process.env.PLACES_API_KEY)
  // https://maps.googleapis.com/maps/api/place/findplacefromtext/json
  //?input=mongolian
  //&inputtype=textquery
  //&locationbias=circle%3A2000%4047.6918452%2C-122.2226413
  //&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry
  //&key=YOUR_API_KEY'
  const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
    params: {
      input: 'Bauru Shopping',
      inputtype: 'textquery',
      language: 'pt-BR',
      fields: 'formatted_address,geometry,name,place_id',
      key: process.env.PLACES_API_KEY,
    }
  })
  console.log('data', JSON.stringify(data))
}


module.exports = {
  async run() {
    console.log('Test places api')
    try {
      await getAPI()
    } catch(err) {
      console.warn('Test failed')
      console.log(err)
      return
    }
    console.warn('Test suceeded')
  }
}