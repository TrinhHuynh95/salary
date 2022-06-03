const { repositories } = require('../../src/lib/providers')

module.exports = async () => {
  const configRepository = repositories('mst_config')
  await configRepository.truncate()

  const all = []
  all.push(configRepository.create({
    name: 'test',
    value: '123'
  }))
  await Promise.all(all)
}
