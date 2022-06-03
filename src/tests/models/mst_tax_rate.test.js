const MstTaxRateModel = require('../../src/models/mst_tax_rate')

describe('Test MstTaxRateModel', () => {
  const record = MstTaxRateModel.new({
    _id: '1231',
    level: '1',
    amount_from: '5000',
    amount_to: '10000',
    rate: '0.1',
    create_at: '2022-06-01 05:06:00'
  })
  test('get _id', async () => {
    expect(record._id).toBe('1231')
  })
  for (const key of ['level', 'amount_from', 'amount_to', 'rate']) {
    test(`${key} is number`, async () => {
      expect(record[key]).not.toBeNaN()
    })
    test(`set ${key} is not number => error`, async () => {
      expect(() => {
        record[key] = 'dfsd'
      }).toThrow()
    })
    test(`set ${key} is number => ok`, async () => {
      expect(() => {
        record[key] = 23
      }).not.toThrow()
    })
  }
})
