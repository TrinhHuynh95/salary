const ModelBase = require('../lib/model_base')

class MstTaxRateModel extends ModelBase {
  init () {
    this._attributes = [
      '_id',
      'level',
      'amount_from',
      'amount_to',
      'rate',
      'create_at'
    ]
  }

  get _id () {
    return this._data?._id
  }

  get level () {
    return this._data.level && parseInt(this._data.level)
  }

  set level (level) {
    if (isNaN(level)) {
      throw new Error(`level ${level} is not number`)
    }

    this._data.level = level

    return this
  }

  get amount_from () {
    return this._data.amount_from && parseFloat(this._data.amount_from)
  }

  set amount_from (amountFrom) {
    if (isNaN(amountFrom)) {
      throw new Error(`Amount From ${amountFrom} is not money`)
    }

    this._data.amount_from = amountFrom

    return this
  }

  get amount_to () {
    return this._data.amount_to && parseFloat(this._data.amount_to)
  }

  set amount_to (amountTo) {
    if (isNaN(amountTo)) {
      throw new Error(`Amount To ${amountTo} is not money`)
    }

    this._data.amount_to = amountTo

    return this
  }

  get rate () {
    return this._data.rate && parseFloat(this._data.rate)
  }

  set rate (rate) {
    if (isNaN(rate)) {
      throw new Error(`Rate ${rate} is not number`)
    }

    this._data.rate = rate

    return this
  }
}

module.exports = MstTaxRateModel
