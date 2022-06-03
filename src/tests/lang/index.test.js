const path = require('path')

const lang = require('../../src/lib/lang')
const testLang = require('./data_test')

const pathLang = path.resolve(path.dirname(__filename), 'data_test.js')

describe(`Test loading ${pathLang}`, () => {
  beforeAll(() => {
    return lang.init(pathLang)
  })

  test('return default value when key not exist', () => {
    expect(lang.get('lang-keys', 'not-exist')).toBe('not-exist')
  })

  test('get lang', () => {
    expect(lang.get('data_test.key')).toBe(testLang.key)
  })

  test('get lang from array path', () => {
    expect(lang.get('data_test.array.0')).toBe(testLang.array[0])
  })

  test('get lang from object path', () => {
    expect(lang.get('data_test.object.a')).toBe(testLang.object.a)
  })

  test('set new key, but not change other', () => {
    lang.set('data_test.newKey', 123)
    expect(lang.get('data_test.newKey')).toBe(123)
    expect(lang.get('data_test.key')).toBe(testLang.key)
  })
})
