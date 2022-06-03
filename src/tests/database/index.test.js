const { repositories, application } = require('../../src/lib/providers')
const database = require('../../src/lib/database')
const config = require('../../src/lib/config')

const testData = []
const tables = {}

database.connection = {
  dropTableIfExists: async (table) => table === 'mst_config' ? 'ok' : 'err',
  truncate: async (table) => table === 'mst_config' ? 'ok' : 'err',
  createTable: async (table, cb) => {
    if (table === 'mst_config') {
      tables[table] = {}
      cb(tables[table])
      return 'ok'
    }
    return 'err'
  },
  insert: async (table, data) => {
    if (table === 'mst_config') {
      testData.push(data)
      return 'ok'
    }
    return 'err'
  },
  all: async (table) => (table === 'mst_config' ? testData : [])
}

describe('Test Database', () => {
  beforeAll(() => {
    application().initEnv()
      .loadConfig()
    config.set('app.sys_paths.seed', __dirname)
    config.set('app.sys_paths.migrate', __dirname)
  })
  test('get Database.seed', async () => {
    await database.seed('seed')
    const configRepository = repositories('mst_config')
    const result = await configRepository.all()
    expect(result).toHaveLength(1)
  })
  test('get Database.migrate', async () => {
    await database.migrate('migrate')
    expect(tables.mst_config).toStrictEqual({
      _id: 'increments',
      name: 'string',
      value: 'string',
      create_at: 'timestamp'
    })
  })
})
