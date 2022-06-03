const { repositories } = require('../../lib/providers')

module.exports = async () => {
  const taxRateRepository = repositories('mst_tax_rate')

  await taxRateRepository.dropTableIfExists()

  await taxRateRepository.createTable((table) => {
    table.increments('_id').primary()
    table.integer('level')
    table.double('amount_from')
    table.double('amount_to')
    table.decimal('rate')
    table.timestamp('create_at')
  })
}
