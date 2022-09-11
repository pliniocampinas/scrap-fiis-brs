describe('env variable ', () => {
  it('PLACES_API_KEY should be a mock string', () => {
    expect(process.env.PLACES_API_KEY).toBe('TEST_PLACES_API_KEY')
  })
})