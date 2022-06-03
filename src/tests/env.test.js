const providers = require('../src/lib/providers')
const app = providers.application()

describe('Test .env.test loaded', () => {
  beforeAll(() => {
    app.initEnv()
  })

  test('NODE_ENV', () => {
    expect(process.env.NODE_ENV.trim()).toBe('test')
  })

  for (const name of [
    'ALLOWED_ORIGINS',
    'PORT',
    'DB_CONNECTION',
    'DB_HOST',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE'
  ]) {
    test(`test process.env.${name}`, () => {
      expect(process.env[name]).toBeDefined()
    })
  }
})
