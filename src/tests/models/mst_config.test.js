const MstConfigModel = require('../../src/models/mst_config')

describe('Test MstConfigModel', () => {
  const record = MstConfigModel.new({
    _id: '1231',
    name: 'name',
    value: 'value',
    create_at: '2022-06-01 05:06:00'
  })
  test('get _id', async () => {
    expect(record._id).toBe('1231')
  })
  test('set Name is null => error(required)', async () => {
    expect(() => {
      record.name = null
    }).toThrow()
  })
  test('set Name is number => ok', async () => {
    expect(() => {
      record.name = 23
    }).not.toThrow()
  })
})
