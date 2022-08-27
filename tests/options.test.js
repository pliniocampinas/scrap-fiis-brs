const options = require('../options');

test('Every option should contain a numeric value and a text', () => {
  options.forEach(opt => {
    expect(opt.value).not.toMatch(/(?!^\d+$)^.+$/g)
    expect(opt.text.length).toBeGreaterThan(0)
  })
})

test('Last option should be the exit option with 0 value', () => {
  const lastOption = options[options.length - 1]
  expect(lastOption.value).toBe('0')
  expect(lastOption.text).toBe('Exit')
})