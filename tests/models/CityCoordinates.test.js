const CityCoordinates = require('../../models/CityCoordinates');

test('CityCoordinates constructor should trim values', () => {
  const cityCoordinates = new CityCoordinates({
    cityId: '  cityId  ',
    isCapital: ' 1',
    cityName: '  cityName  ',
    latitude: '  latitude  ',
    longitude: '  longitude  ',
  })
  expect(cityCoordinates.cityId).toBe('cityId')
  expect(cityCoordinates.isCapital).toBe(true)
  expect(cityCoordinates.cityName).toBe('cityName')
  expect(cityCoordinates.latitude).toBe('latitude')
  expect(cityCoordinates.longitude).toBe('longitude')
})