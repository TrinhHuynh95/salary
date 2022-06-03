const RepositoryBase = require('../lib/repositories/repository.base')
const MstConfigModel = require('../models/mst_config')

class MstConfigRepository extends RepositoryBase {
  table = 'mst_config'
  modelClass = MstConfigModel
}

module.exports = MstConfigRepository
