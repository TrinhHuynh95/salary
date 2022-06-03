const { repositories } = require('../lib/providers')
const { byKey } = require('../lib/helpers/object')

class SalaryCalcService {
  _salary_input
  _insured_salary_input
  _depend_amount_input = 0
  _rates
  _config
  _tax = 0

  async init () {
    if (!this._config) {
      const result = await repositories('mst_config').all()
      this._config = byKey(result, 'name', 'value')
    }

    if (!this._rates) {
      this._rates = await repositories('mst_tax_rate').all()
    }
  }

  set salary_input (money) {
    if (isNaN(money)) {
      throw new Error(`Input ${money} is not money`)
    }

    this._salary_input = money
  }

  get salary_input () {
    return this._salary_input
  }

  set insured_salary_input (money) {
    if (isNaN(money)) {
      throw new Error(`Input ${money} is not money`)
    }

    this._insured_salary_input = money
  }

  get insured_salary_input () {
    return this._salary_input
  }

  set depend_amount_input (dependAmount) {
    if (isNaN(dependAmount)) {
      throw new Error(`Input ${dependAmount} is not number`)
    }

    this._depend_amount_input = dependAmount
  }

  get depend_amount_input () {
    return this._salary_input
  }

  get tax_payer () {
    return parseFloat(this.mstConfig('tax_payer', 0))
  }

  get depend_tax_payer () {
    return parseFloat(this.mstConfig('depend_tax_payer', 0))
  }

  get social_insurance_rate () {
    return parseFloat(this.mstConfig('social_insurance_rate', 0))
  }

  get social_insurance_amount () {
    return this.social_insurance_rate * Math.min(this.basic_max_insured_amount, this._insured_salary_input)
  }

  get health_insurance_rate () {
    return parseFloat(this.mstConfig('health_insurance_rate', 0))
  }

  get health_insurance_amount () {
    return this.health_insurance_rate * Math.min(this.basic_max_insured_amount, this._insured_salary_input)
  }

  get unemployment_insurance_rate () {
    return parseFloat(this.mstConfig('unemployment_insurance_rate', 0))
  }

  get unemployment_insurance_amount () {
    return this.unemployment_insurance_rate *
      Math.min(this.area_max_insured_amount, this._insured_salary_input)
  }

  get area_max_insured_amount () {
    return parseFloat(this.mstConfig('area_max_insured_amount', 0))
  }

  get basic_max_insured_amount () {
    return parseFloat(this.mstConfig('basic_max_insured_amount', 0))
  }

  get rates () {
    return this._rates
  }

  get gross_to_net () {
    if (!this._salary_input) {
      return ''
    }
    const notTaxAmount = this.tax_payer +
      (this.depend_tax_payer * this._depend_amount_input) +
      this.insured_amount

    if (this._salary_input <= notTaxAmount) {
      return this._salary_input - this.insured_amount
    }
    const taxAmount = this._salary_input - notTaxAmount

    let tax = 0
    const rates = byKey(this.rates, 'level')

    for (let i = 1; i <= this.rates.length; i++) {
      const rate = rates[i.toString()]
      if (taxAmount < rate.amount_from) {
        break
      }
      const levelTaxAmount = rate.amount_to
        ? Math.min(
          rate.amount_to - rate.amount_from,
          taxAmount - rate.amount_from
        )
        : (taxAmount - rate.amount_from)

      tax += levelTaxAmount * rate.rate
    }

    this._tax = tax

    return this._salary_input - this.insured_amount - tax
  }

  get tax () {
    return this._tax
  }

  get insured_amount () {
    return this.social_insurance_amount +
      this.unemployment_insurance_amount +
      this.health_insurance_amount
  }

  mstConfig (name, defaultValue) {
    return name ? (this._config[name] || defaultValue) : this._config
  }
}

module.exports = SalaryCalcService
