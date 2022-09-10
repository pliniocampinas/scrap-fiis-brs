const axios = require('axios').default;

const getAPI = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/')
  console.log('data', data)
  console.log('process', process.env.PLACES_API_KEY)
};


module.exports = {
  async run() {
    console.log('Test places api')
    await getAPI()
  }
}