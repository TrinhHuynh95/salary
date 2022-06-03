const MysqlDriver = require('./mysql')
const MongodbDriver = require('./mongodb')

const drivers = {
  mysql: MysqlDriver,
  mongodb: MongodbDriver
}

const databaseDriver = {
  driver: null,
  init (name, settings) {
    if (!drivers[name]) {
      throw new Error(`Driver ${name} is not exist`)
    }
    this.driver = new drivers[name](settings)
  },

  async connect (name, settings) {
    if (name && settings) {
      this.init(name, settings)
    }
    await this.driver.connect()

    return this.driver
  },

  close () {
    this.driver.close()
  }
}

module.exports = databaseDriver
