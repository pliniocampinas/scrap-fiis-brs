class CityCoordinates {
  constructor(city) {
    this.cityId = city.cityId?.trim()
    this.stateAcronym = city.stateAcronym?.trim()
    this.cityName = city.cityName?.trim()
    this.latitude = city.latitude?.trim()
    this.longitude = city.longitude?.trim()
  }
}

module.exports = CityCoordinates