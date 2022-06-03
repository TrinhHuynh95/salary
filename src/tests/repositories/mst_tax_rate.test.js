const MstTaxRateModel = require('../../src/models/mst_tax_rate')
const { repositories, application } = require('../../src/lib/providers')

jest.mock('../../src/lib/database', () => {
  return {
    connection: {
      dropTableIfExists: async (table) => table === 'mst_tax_rate' ? 'ok' : 'err',
      truncate: async (table) => table === 'mst_tax_rate' ? 'ok' : 'err',
      createTable: async (table, cb) => table === 'mst_tax_rate' ? 'ok' : 'err',
      all: async (table) => (table === 'mst_tax_rate'
        ? [
            {
              _id: '1231',
              level: 6,
              amount_from: 52,
              amount_to: 80,
              rate: 0.3,
              create_at: '2022-06-01 05:06:00'
            }
          ]
        : [])
    }

  }
})

describe('Test MstTaxRateRepository', () => {
  beforeAll(() => {
    application().initEnv()
      .loadConfig()
  })
  test('get MstConfigRepository.all', async () => {
    const configRepository = repositories('mst_tax_rate')
    const result = await configRepository.all()
    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(MstTaxRateModel)
    expect(result[0].fill()).toStrictEqual(
      {
        _id: '1231',
        level: 6,
        amount_from: 52,
        amount_to: 80,
        rate: 0.3,
        create_at: '2022-06-01 05:06:00'
      })
  })
})
