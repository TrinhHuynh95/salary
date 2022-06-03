class RepositoryBase {
  _db
  table
  modelClass = null

  constructor (db) {
    if (!db) {
      throw new Error('db is not defined')
    }
    this._db = db
  }

  dropTableIfExists () {
    return this._db.dropTableIfExists(this.table)
  }

  createTable (cb) {
    return this._db.createTable(this.table, cb)
  }

  truncate () {
    return this._db.truncate(this.table)
  }

  async all () {
    return await this._db.all(this.table).then(res => {
      return res.map(item => this.modelClass.new(item))
    })
  }

  create (data) {
    let updateDate = data

    if (this.modelClass) {
      const entity = this.modelClass.new()
      entity.setFillData(data)
      if (!entity.create_at && entity._attributes.indexOf('create_at') !== -1) {
        entity.create_at = new Date()
      }
      if (!entity.update_at && entity._attributes.indexOf('update_at') !== -1) {
        entity.update_at = new Date()
      }
      updateDate = entity.fill()
    }

    return this._db.insert(this.table, updateDate)
  }
}

module.exports = RepositoryBase
