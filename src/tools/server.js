const providers = require('../src/lib/providers')

const logger = providers.logger()
const app = providers.application()

app.init()
  .then(() => {
    logger.log('Salary app is running')
    app.runServer().then()
  })
  .catch((e) => {
    logger.error('err', e)
  })
