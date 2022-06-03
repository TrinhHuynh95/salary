const { MongoClient } = require('mongodb')

class MongodbDriver {
  _config
  client
  db

  constructor (config) {
    this._config = config
  }

  async connect () {
    this.client = new MongoClient(this.url)

    await this.client.connect()

    this.db = await this.client.db(this._config.database)
  }

  get url () {
    const { url, username, password, host, port } = this._config
    return `${url}${username}:${password}@${host}:${port}/`
  }

  get query () {
    return this.db
  }

  async close () {
    if (this.client) {
      await this.client.close()
    }
  }

  find (table, where) {
    return this.db.collection(table).find(where).toArray()
  }

  findOne (table, where) {
    return this.db.collection(table).findOne(where)
  }

  insert (table, data) {
    return this.db.collection(table).insertOne(data)
  }

  async dropTableIfExists (table) {
    const collections = (await this.db.listCollections().toArray()).map(collection => collection.name)

    if (collections.indexOf(table) !== -1) {
      return this.db.collection(table).drop()
    }

    return null
  }

  createTable (table, cb) {
    // mongo will create table when insert data
    return true
  }

  truncate (table) {
    return this.dropTableIfExists(table)
  }

  all (table) {
    return this.db.collection(table).find({}).toArray()
  }
}

module.exports = MongodbDriver
