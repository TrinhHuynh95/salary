const SalaryCalcService = require('../services/salary_calc')
const lang = require('../lib/lang')

const home = {
  async index (request, h) {
    const salaryCalc = new SalaryCalcService()
    let error = ''
    await salaryCalc.init()

    try {
      if (request.query?.salary) {
        salaryCalc.salary_input = request.query?.salary
        salaryCalc.insured_salary_input = request.query?.salary
      }
      if (request.query?.insured_salary) {
        salaryCalc.insured_salary_input = request.query?.insured_salary
      }
      if (request.query?.depend_amount) {
        salaryCalc.depend_amount_input = request.query?.depend_amount
      }
    } catch (e) {
      error = e.message
    }
    return h.view('home/index', {
      salaryCalc,
      title: lang.get('site.home_page_title'),
      description: lang.get('site.home_page_description'),
      oldReq: request.query,
      error
    })
  }
}

module.exports = home
