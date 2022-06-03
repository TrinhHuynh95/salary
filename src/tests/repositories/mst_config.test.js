const MstConfigModel = require('../../src/models/mst_config')
const { repositories, application } = require('../../src/lib/providers')

jest.mock('../../src/lib/database', () => {
  return {
    connection: {
      dropTableIfExists: async (table) => table === 'mst_config' ? 'ok' : 'err',
      truncate: async (table) => table === 'mst_config' ? 'ok' : 'err',
      createTable: async (table, cb) => table === 'mst_config' ? 'ok' : 'err',
      all: async (table) => (table === 'mst_config'
        ? [
            {
              _id: '1231',
              name: 'name',
              value: 'value',
              create_at: '2022-06-01 05:06:00'
            }
          ]
        : [])
    }

  }
})

describe('Test MstConfigRepository', () => {
  beforeAll(() => {
    application().initEnv()
      .loadConfig()
  })
  test('get MstConfigRepository.all', async () => {
    const configRepository = repositories('mst_config')
    const result = await configRepository.all()
    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(MstConfigModel)
    expect(result[0].fill()).toStrictEqual(
      {
        _id: '1231',
        name: 'name',
        value: 'value',
        create_at: '2022-06-01 05:06:00'
      })
  })
  test('get MstConfigRepository.dropTableIfExists', async () => {
    const configRepository = repositories('mst_config')
    const result = await configRepository.dropTableIfExists()
    expect(result).toBe('ok')
  })
  test('get MstConfigRepository.truncate', async () => {
    const configRepository = repositories('mst_config')
    const result = await configRepository.truncate()
    expect(result).toBe('ok')
  })
  test('get MstConfigRepository.createTable', async () => {
    const configRepository = repositories('mst_config')
    const result = await configRepository.createTable(() => {})
    expect(result).toBe('ok')
  })
})
