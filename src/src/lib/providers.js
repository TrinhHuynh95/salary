const Application = require('./application')
const repositoriesLoader = require('./repositories')
const loader = require('./helpers/loader')
const logger = require('./helpers/logger')
const config = require('./config')
const path = require('path')

const providers = {
  instances: {},
  application () {
    if (!providers.get('application')) {
      providers.add('application', new Application(providers.logger()))
    }

    return providers.get('application')
  },
  repositories (name) {
    if (!providers.get('repositories')) {
      providers.add('repositories', repositoriesLoader(config))
    }

    if (name) {
      return providers.get('repositories').get(name)
    }

    return providers.get('repositories')
  },
  logger () {
    if (!providers.get('logger')) {
      providers.add('logger', logger)
    }

    return providers.get('logger')
  },
  get (name) {
    if (!providers.instances[name] && !providers[name]) {
      providers.loadEx(name)

      if (!providers.instances[name]) {
        throw new Error(`Provider ${name} is not exist`)
      }
    }

    return providers.instances[name]
  },
  add (name, provider) {
    providers.instances[name] = provider
  },
  loadEx (name) {
    const loaders = loader(path.resolve(config.get('app.sys_paths.providers'), name + '.js'))
    for (const name in loaders) {
      providers.add(name, new loaders[name]())
    }
  }
}

module.exports = providers
