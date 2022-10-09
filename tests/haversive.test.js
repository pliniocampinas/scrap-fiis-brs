const haversine = require('haversine-distance')

test('haversine should calculate distance from the equator', () => {
  const a = { latitude: 37.8136, longitude: 144.9631 }
  const b = { latitude: 33.8650, longitude: 151.2094 }
  const distance = haversine(a, b).toFixed(2)

  expect(distance).toBe('714504.18')
})

test('haversine should calculate distance from the equator', () => {
  const cityCoordinates = {
    longitude: -51.0694,
    latitude: 0.034934,
  }
  const equator = { latitude: 0.00001, longitude: cityCoordinates.longitude }
  const distanceFromEquatorKilometers = haversine(cityCoordinates, equator) / 1000

  expect(distanceFromEquatorKilometers.toFixed(2)).toBe('3.89')
})