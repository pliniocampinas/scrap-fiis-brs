const parsePopulation = (pop) => {
  return parseInt(
    pop
      ?.replaceAll('.', '')
      ?.split('(')[0]
      ?.trim()
  ) || 0
}

class CityPopulation {
  constructor(populationEstimate, year) {
    this.cityId = parseInt(populationEstimate['COD. UF'].trim() + populationEstimate['COD. MUNIC'].trim()) || 0
    this.stateAcronym = populationEstimate['UF'].trim()
    this.cityName = populationEstimate['NOME DO MUNICÍPIO'].trim()
    this.population = parsePopulation(populationEstimate['POPULAÇÃO ESTIMADA'] || populationEstimate[' POPULAÇÃO ESTIMADA'])
    this.year = year
  }
}

module.exports = CityPopulation