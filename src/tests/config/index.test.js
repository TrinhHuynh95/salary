const path = require('path')

const config = require('../../src/lib/config')
const testConfig = require('./data_test')

const pathConfig = path.resolve(path.dirname(__filename), 'data_test.js')

describe(`Test loading ${pathConfig}`, () => {
  beforeAll(() => {
    return config.init(pathConfig)
  })

  test('return default value when key not exist', () => {
    expect(config.get('config-keys', 'not-exist')).toBe('not-exist')
  })

  test('get config', () => {
    expect(config.get('data_test.key')).toBe(testConfig.key)
  })

  test('get config from array path', () => {
    expect(config.get('data_test.array.0')).toBe(testConfig.array[0])
  })

  test('get config from object path', () => {
    expect(config.get('data_test.object.a')).toBe(testConfig.object.a)
  })

  test('set new key, but not change other', () => {
    config.set('data_test.newKey', 123)
    expect(config.get('data_test.newKey')).toBe(123)
    expect(config.get('data_test.key')).toBe(testConfig.key)
  })
})
