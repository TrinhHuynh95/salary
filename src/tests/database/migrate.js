const { repositories } = require('../../src/lib/providers')

module.exports = async () => {
  const configRepository = repositories('mst_config')

  await configRepository.dropTableIfExists()

  await configRepository.createTable((table) => {
    table._id = 'increments'
    table.name = 'string'
    table.value = 'string'
    table.create_at = 'timestamp'
  })
}
