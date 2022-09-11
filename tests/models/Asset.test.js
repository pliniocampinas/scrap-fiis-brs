const Asset = require('../../models/Asset');

test('Asset constructor should trim values, parse squareMeters to integer and set state to UPPER case', () => {
  const asset = new Asset({
    address: '  address  ',
    neighborhood: '  neighborhood  ',
    squareMeters: '  69.628,00 m2  ',
    fundAcronym: '  fundAcronym  ',
    city: '  São Paulo',
    state: 'sp ',
  })
  expect(asset.address).toBe('address')
  expect(asset.neighborhood).toBe('neighborhood')
  expect(asset.squareMeters).toBe(69628)
  expect(asset.fundAcronym).toBe('fundAcronym')
  expect(asset.city).toBe('São Paulo')
  expect(asset.state).toBe('SP')
})

test('Asset constructor should parse city and state properly if source is funds-explorer', () => {
  const asset = new Asset({
    cityWithState: '  São Paulo - sp  ',
    source: 'funds-explorer',
  })
  expect(asset.city).toBe('São Paulo')
  expect(asset.state).toBe('SP')
})

test('Asset constructor should parse city and state properly if source is funds-explorer and city contains hifen', () => {
  const asset = new Asset({
    cityWithState: '  Embu-Guaçu - SP  ',
    source: 'funds-explorer',
  })
  expect(asset.city).toBe('Embu-Guaçu')
  expect(asset.state).toBe('SP')
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

test('Asset validate should accept a valid asset', () => {
  const fundWithInvalidState = new Asset({
    fundAcronym: '123456789a',
    city: '  São Paulo ',
    state: 'SP',
  })

  const fundWithInvalidStateValidation = fundWithInvalidState.validade()

  expect(fundWithInvalidStateValidation.isValid).toBe(true)
})