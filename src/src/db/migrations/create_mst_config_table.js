const { repositories } = require('../../lib/providers')

module.exports = async () => {
  const configRepository = repositories('mst_config')

  await configRepository.dropTableIfExists()

  await configRepository.createTable((table) => {
    table.increments('_id').primary()
    table.string('name')
    table.string('value')
    table.timestamp('create_at')
  })
}
