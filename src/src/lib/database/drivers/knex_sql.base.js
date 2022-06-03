const knex = require('knex')

class KnexSqlBase {
  _config
  client
  clientName

  constructor (config) {
    this._config = config
  }

  async connect () {
    const { username, password, host, port, database } = this._config

    if (!this.clientName) {
      throw new Error('clientName is required')
    }

    this.client = await knex({
      client: this.clientName,
      connection: {
        host,
        port,
        user: username,
        password,
        database
      }
    })
  }

  get query () {
    return this.client
  }

  close () {
    this.client.destroy()
  }

  dropTableIfExists (table) {
    return this.client.schema.dropTableIfExists(table)
  }

  createTable (table, cb) {
    return this.client.schema.createTable(table, cb)
  }

  insert (table, data) {
    return this.client(table).insert(data)
  }

  truncate (table) {
    return this.client(table).truncate()
  }

  all (table) {
    return this.client(table).select('*')
  }
}

module.exports = KnexSqlBase
