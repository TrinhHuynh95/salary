const loader = require('../helpers/loader')
const database = require('../database/index')

module.exports = (config) => {
  const loaders = loader(config.get('app.sys_paths.repository'))

  const items = {}
  for (const name in loaders) {
    items[name] = new loaders[name](database.connection)
  }
  return {
    items,
    get (name) {
      if (!this.items[name]) {
        throw new Error(`Repository ${name} is not exist`)
      }

      return this.items[name]
    }
  }
}
