const CityCoordinates = require('../../models/CityCoordinates');

test('CityCoordinates constructor should trim values', () => {
  const cityCoordinates = new CityCoordinates({
    cityId: '  cityId  ',
    stateAcronym: '  stateAcronym  ',
    cityName: '  cityName  ',
    latitude: '  latitude  ',
    longitude: '  longitude  ',
  })
  expect(cityCoordinates.cityId).toBe('cityId')
  expect(cityCoordinates.stateAcronym).toBe('stateAcronym')
  expect(cityCoordinates.cityName).toBe('cityName')
  expect(cityCoordinates.latitude).toBe('latitude')
  expect(cityCoordinates.longitude).toBe('longitude')
})