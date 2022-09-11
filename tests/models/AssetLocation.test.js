const AssetLocation = require('../../models/AssetLocation');

test('AssetLocation constructor should trim values', () => {
  const assetLocation = new AssetLocation({
    assetSequential: 123,
    inputText: ' inputText  ',
    outFormattedAddress: ' outFormattedAddress  ',
    outName: ' outName  ',
    outPlaceId: ' outPlaceId  ',
    outLatitude: ' outLatitude  ',
    outLongitude: ' outLongitude  ',
  })
  expect(assetLocation.assetSequential).toBe(123)
  expect(assetLocation.inputText).toBe('inputText')
  expect(assetLocation.outFormattedAddress).toBe('outFormattedAddress')
  expect(assetLocation.outName).toBe('outName')
  expect(assetLocation.outPlaceId).toBe('outPlaceId')
  expect(assetLocation.outLatitude).toBe('outLatitude')
  expect(assetLocation.outLongitude).toBe('outLongitude')
})