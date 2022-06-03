const KnexSqlBase = require('./knex_sql.base')

class MysqlDriver extends KnexSqlBase {
  clientName = 'mysql2'
}

module.exports = MysqlDriver
