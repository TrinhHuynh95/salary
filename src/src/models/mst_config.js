const ModelBase = require('../lib/model_base')

class MstConfigModel extends ModelBase {
  init () {
    this._attributes = [
      '_id',
      'name',
      'value',
      'create_at'
    ]
  }

  get _id () {
    return this._data?._id
  }

  get name () {
    return this._data.name
  }

  set name (name) {
    if (!name) {
      throw new Error('name is required')
    }

    this._data.name = name

    return this
  }

  get value () {
    return this._data.value
  }

  set value (value) {
    this._data.value = value

    return this
  }
}

module.exports = MstConfigModel
