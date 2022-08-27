const Fund = require('../../models/Fund');

test('Fund constructor should trim values', () => {
  const fund = new Fund({
    url: '  url  ',
    acronym: '  acronym  ',
    longName: '  longName  ',
    admin: '  admin  ',
  })
  expect(fund.url).toBe('url')
  expect(fund.acronym).toBe('acronym')
  expect(fund.longName).toBe('longName')
  expect(fund.admin).toBe('admin')
})

test('Fund constructor should accept null and undefined values', () => {
  const fund = new Fund({
    url: null,
  })
  expect(fund.url).toBe(undefined)
  expect(fund.acronym).toBe(undefined)
  expect(fund.longName).toBe(undefined)
  expect(fund.admin).toBe(undefined)
})

test('Fund validate should reject null or undefined acronym values', () => {
  const fundWithUndefinedAcronym = new Fund({
    acronym: undefined,
  })
  const fundWithNullAcronym = new Fund({
    acronym: null,
  })

  const fundWithUndefinedAcronymValidation = fundWithUndefinedAcronym.validade()
  const fundWithNullAcronymValidation = fundWithNullAcronym.validade()

  expect(fundWithUndefinedAcronymValidation.isValid).toBe(false)
  expect(fundWithUndefinedAcronymValidation.error).toBe('Acronym cannot be null or undefined')
  expect(fundWithNullAcronymValidation.isValid).toBe(false)
  expect(fundWithNullAcronymValidation.error).toBe('Acronym cannot be null or undefined')
})

test('Fund validate should reject empty string acronym values', () => {
  const fundWithEmptyAcronym = new Fund({
    acronym: '',
  })

  const fundWithEmptyAcronymValidation = fundWithEmptyAcronym.validade()

  expect(fundWithEmptyAcronymValidation.isValid).toBe(false)
  expect(fundWithEmptyAcronymValidation.error).toBe('Acronym cannot be empty')
})

test('Fund validate should reject acronym value larger than 10 characters', () => {
  const fundWithLongAcronym = new Fund({
    acronym: '123456789a1',
  })

  const fundWithLongAcronymValidation = fundWithLongAcronym.validade()

  expect(fundWithLongAcronymValidation.isValid).toBe(false)
  expect(fundWithLongAcronymValidation.error).toBe('Acronym cannot be larger than 10 characters')
})

test('Fund validate should accept acronym value with less than or equal to 10 characters', () => {
  const fundWithValidAcronym = new Fund({
    acronym: '123456789a',
  })

  const fundWithValidAcronymValidation = fundWithValidAcronym.validade()

  expect(fundWithValidAcronymValidation.isValid).toBe(true)
  expect(fundWithValidAcronymValidation.error).toBe(undefined)
})