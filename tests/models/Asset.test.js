const Asset = require('../../models/Asset');

test('Asset constructor should trim values and parse squareMeters to integer', () => {
  const asset = new Asset({
    address: '  address  ',
    neighborhood: '  neighborhood  ',
    squareMeters: '  69.628,00 m2  ',
    fundAcronym: '  fundAcronym  ',
    city: '  city  ',
    state: '  state  ',
  })
  expect(asset.address).toBe('address')
  expect(asset.neighborhood).toBe('neighborhood')
  expect(asset.squareMeters).toBe('69628')
  expect(asset.fundAcronym).toBe('fundAcronym')
  expect(asset.city).toBe('city')
  expect(asset.state).toBe('state')
})

test('Fund validate should reject null or undefined fundAcronym values', () => {
  const assetWithUndefinedAcronym = new Asset({
    fundAcronym: undefined,
  })
  const assetWithNullAcronym = new Asset({
    fundAcronym: null,
  })

  const assetWithUndefinedAcronymValidation = assetWithUndefinedAcronym.validade()
  const assetWithNullAcronymValidation = assetWithNullAcronym.validade()

  expect(assetWithUndefinedAcronymValidation.isValid).toBe(false)
  expect(assetWithUndefinedAcronymValidation.error).toBe('FundAcronym cannot be null or undefined')
  expect(assetWithNullAcronymValidation.isValid).toBe(false)
  expect(assetWithNullAcronymValidation.error).toBe('FundAcronym cannot be null or undefined')
})

test('Asset validate should reject empty string fundAcronym values', () => {
  const assetWithEmptyAcronym = new Asset({
    fundAcronym: '',
  })

  const assetWithEmptyAcronymValidation = assetWithEmptyAcronym.validade()

  expect(assetWithEmptyAcronymValidation.isValid).toBe(false)
  expect(assetWithEmptyAcronymValidation.error).toBe('FundAcronym cannot be empty')
})

test('Asset validate should reject fundAcronym value larger than 10 characters', () => {
  const fundWithLongAcronym = new Asset({
    fundAcronym: '123456789a1',
  })

  const fundWithLongAcronymValidation = fundWithLongAcronym.validade()

  expect(fundWithLongAcronymValidation.isValid).toBe(false)
  expect(fundWithLongAcronymValidation.error).toBe('FundAcronym cannot be larger than 10 characters')
})

// TODO: STATE
// test('Asset validate should accept fundAcronym value with less than or equal to 10 characters', () => {
//   const fundWithValidAcronym = new Fund({
//     acronym: '123456789a',
//   })

//   const fundWithValidAcronymValidation = fundWithValidAcronym.validade()

//   expect(fundWithValidAcronymValidation.isValid).toBe(true)
//   expect(fundWithValidAcronymValidation.error).toBe(undefined)
// })