class CityCoordinates {
  constructor(city) {
    this.cityId = city.cityId?.trim()
    this.isCapital = city.isCapital?.trim() === '1'? true: false
    this.cityName = city.cityName?.trim()
    this.latitude = city.latitude?.trim()
    this.longitude = city.longitude?.trim()
  }
}

module.exports = CityCoordinates