const { repositories } = require('../../lib/providers')

module.exports = async () => {
  const configRepository = repositories('mst_config')
  await configRepository.truncate()

  const all = []
  all.push(configRepository.create({
    name: 'area_max_insured_amount',
    value: 4420000 * 20
  }))
  all.push(configRepository.create({
    name: 'basic_max_insured_amount',
    value: 1490000 * 20
  }))
  all.push(configRepository.create({
    name: 'tax_payer',
    value: 11000000
  }))
  all.push(configRepository.create({
    name: 'depend_tax_payer',
    value: 4400000
  }))
  all.push(configRepository.create({
    name: 'social_insurance_rate',
    value: 0.08
  }))
  all.push(configRepository.create({
    name: 'health_insurance_rate',
    value: 0.015
  }))
  all.push(configRepository.create({
    name: 'unemployment_insurance_rate',
    value: 0.01
  }))

  await Promise.all(all)
}
