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
  expect(asset.squareMeters).toBe(69628)
  expect(asset.fundAcronym).toBe('fundAcronym')
  expect(asset.city).toBe('city')
  expect(asset.state).toBe('STATE')
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

test('Asset validate should reject state value nullish or empty', () => {
  const fundWithNoState = new Asset({
    fundAcronym: '123456789a',
  })

  const fundWithEmptyState = new Asset({
    fundAcronym: '123456789a',
    state: ''
  })

  const fundWithNoStateValidation = fundWithNoState.validade()
  const fundWithEmptyStateValidation = fundWithEmptyState.validade()

  expect(fundWithNoStateValidation.isValid).toBe(false)
  expect(fundWithNoStateValidation.error).toBe('State cannot be empty')
  expect(fundWithEmptyStateValidation.isValid).toBe(false)
  expect(fundWithEmptyStateValidation.error).toBe('State cannot be empty')
})

test('Asset validate should reject state value if length is different than 2', () => {
  const fundWithInvalidState = new Asset({
    fundAcronym: '123456789a',
    state: '1234'
  })

  const fundWithInvalidStateValidation = fundWithInvalidState.validade()

  expect(fundWithInvalidStateValidation.isValid).toBe(false)
  expect(fundWithInvalidStateValidation.error).toBe('State should have 2 characters')
})

test('Asset validate should accept a valid asset', () => {
  const fundWithInvalidState = new Asset({
    fundAcronym: '123456789a',
    state: 'sp'
  })

  const fundWithInvalidStateValidation = fundWithInvalidState.validade()

  expect(fundWithInvalidStateValidation.isValid).toBe(true)
})