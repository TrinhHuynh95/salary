const { repositories } = require('../../lib/providers')

module.exports = async () => {
  const taxRateRepository = repositories('mst_tax_rate')
  await taxRateRepository.truncate()

  const all = []
  const million = 1000000
  all.push(taxRateRepository.create({
    level: 1,
    amount_from: 0,
    amount_to: 5 * million,
    rate: 0.05
  }))
  all.push(taxRateRepository.create({
    level: 2,
    amount_from: 5 * million,
    amount_to: 10 * million,
    rate: 0.1
  }))
  all.push(taxRateRepository.create({
    level: 3,
    amount_from: 10 * million,
    amount_to: 18 * million,
    rate: 0.15
  }))
  all.push(taxRateRepository.create({
    level: 4,
    amount_from: 18 * million,
    amount_to: 32 * million,
    rate: 0.2
  }))
  all.push(taxRateRepository.create({
    level: 5,
    amount_from: 32 * million,
    amount_to: 52 * million,
    rate: 0.25
  }))
  all.push(taxRateRepository.create({
    level: 6,
    amount_from: 52 * million,
    amount_to: 80 * million,
    rate: 0.3
  }))
  all.push(taxRateRepository.create({
    level: 7,
    amount_from: 80 * million,
    amount_to: null,
    rate: 0.35
  }))

  await Promise.all(all)
}
