const RepositoryBase = require('../lib/repositories/repository.base')
const MstTaxRateModel = require('../models/mst_tax_rate')

class MstTaxRateRepository extends RepositoryBase {
  table = 'mst_tax_rate'
  modelClass = MstTaxRateModel
}

module.exports = MstTaxRateRepository
