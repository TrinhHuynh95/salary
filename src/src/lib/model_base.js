class ModelBase {
  _data = {}
  _attributes = []
  _appends = []

  constructor (doc) {
    this._data = doc || {}
    this.init()
  }

  static new (doc) {
    return new this(doc)
  }

  init () {}

  setFillData (data) {
    for (const name in data) {
      if (this._attributes.indexOf(name) === -1) continue

      this[name] = data[name]
    }
  }

  fill () {
    if (!this._attributes) {
      return this._data
    }

    const fill = {}
    for (const name of this._attributes) {
      if (this._data[name] !== undefined) {
        fill[name] = this._data[name]
      }
    }

    return fill
  }

  toJSON () {
    let fill = {}
    if (!this._attributes) {
      fill = this._data
    } else {
      for (const name of this._attributes) {
        if (this[name] !== undefined) {
          fill[name] = this[name]
        }
      }
    }

    if (this._appends) {
      for (const name of this._appends) {
        if (this[name] !== undefined) {
          fill[name] = this[name]
        }
      }
    }
    return fill
  }

  get create_at () {
    return this._data?.create_at
  }

  /**
   * @param {Date|string} createAt
   * @returns {object}
   */
  set create_at (createAt) {
    this._data.create_at = typeof createAt === 'string' ? new Date(createAt) : createAt

    return this
  }

  get update_at () {
    return this._data?.update_at
  }

  /**
   * @param {Date|string} updateAt
   * @returns {object}
   */
  set update_at (updateAt) {
    this._data.update_at = typeof updateAt === 'string' ? new Date(updateAt) : updateAt

    return this
  }
}

module.exports = ModelBase
