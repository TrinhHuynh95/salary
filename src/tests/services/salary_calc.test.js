const MstTaxRateModel = require('../../src/models/mst_tax_rate')
const SalaryCalcService = require('../../src/services/salary_calc')
const providers = require('../../src/lib/providers')
const app = providers.application()

describe('Test SalaryCalcService', () => {
  /**
   *  @type {SalaryCalcService}
   */
  const salaryService = new SalaryCalcService()
  beforeAll(async () => {
    app.initEnv()
    app.loadConfig()
    await app.initDatabase()
    await salaryService.init()
  })

  test('set money not number => error', async () => {
    expect(() => {
      salaryService.salary_input = 'asf'
    }).toThrow()
    expect(() => {
      salaryService.insured_salary_input = 'asf'
    }).toThrow()
    expect(() => {
      salaryService.depend_amount_input = 'asf'
    }).toThrow()
  })

  test('set money is number => ok', async () => {
    expect(() => {
      salaryService.salary_input = 1000000
    }).not.toThrow()
    expect(() => {
      salaryService.insured_salary_input = 1000000
    }).not.toThrow()
    expect(() => {
      salaryService.depend_amount_input = 2
    }).not.toThrow()
  })

  test('get rates', async () => {
    const rates = salaryService.rates
    expect(rates).toHaveLength(7)
    expect(rates[0]).toBeInstanceOf(MstTaxRateModel)
  })

  test('get tax_payer', async () => {
    expect(salaryService.tax_payer).toBe(11000000)
  })

  test('get depend_tax_payer', async () => {
    expect(salaryService.depend_tax_payer).toBe(4400000)
  })

  test('get social_insurance_rate', async () => {
    expect(salaryService.social_insurance_rate).toBe(0.08)
  })

  test('get health_insurance_rate', async () => {
    expect(salaryService.health_insurance_rate).toBe(0.015)
  })

  test('get unemployment_insurance_rate', async () => {
    expect(salaryService.unemployment_insurance_rate).toBe(0.01)
  })

  test('get insured_amount', async () => {
    salaryService.insured_salary_input = 15000000
    expect(salaryService.social_insurance_amount).toBe(1200000)
    expect(salaryService.health_insurance_amount).toBe(225000)
    expect(salaryService.unemployment_insurance_amount).toBe(150000)
    expect(salaryService.insured_amount).toBe(1200000 + 225000 + 150000)
    salaryService.insured_salary_input = 30000000
    expect(salaryService.social_insurance_amount).toBe(2384000)
    expect(salaryService.health_insurance_amount).toBe(447000)
    expect(salaryService.unemployment_insurance_amount).toBe(300000)
    expect(salaryService.insured_amount).toBe(2384000 + 447000 + 300000)
  })

  test('gross to nex', async () => {
    salaryService.salary_input = 15000000
    salaryService.insured_salary_input = 15000000
    salaryService.depend_amount_input = 0
    expect(salaryService.gross_to_net).toBe(13303750)
    salaryService.depend_amount_input = 1
    expect(salaryService.gross_to_net).toBe(13425000)

    salaryService.salary_input = 30000000
    salaryService.insured_salary_input = 30000000
    salaryService.depend_amount_input = 1
    expect(salaryService.gross_to_net).toBe(25898650)

    salaryService.salary_input = 90000000
    salaryService.insured_salary_input = 90000000
    salaryService.depend_amount_input = 0
    expect(salaryService.gross_to_net).toBe(69549500)
  })
})
