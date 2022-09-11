describe('env variable ', () => {
  it('PLACES_API_KEY should be a mock string', () => {
    expect(process.env.PLACES_API_KEY).toBe('TEST_PLACES_API_KEY')
  })

  it('From Test database should be', () => {
    expect(process.env.DB_USER).toBe('app_user')
    expect(process.env.DB_HOST).toBe('localhost')
    expect(process.env.DB_NAME).toBe('fundstestdb')
    expect(process.env.DB_PASSWORD).toBe('app_user123')
    expect(process.env.DB_PORT).toBe('5432')
  })
})