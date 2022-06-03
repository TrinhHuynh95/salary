const fs = require('fs')
const path = require('path')

const { get, set } = require('./helpers/object')
const loader = require('./helpers/loader')

const internals = {}

module.exports.init = function (pathRoot) {
  if (!fs.existsSync(path.resolve(pathRoot))) {
    throw new Error('Lang root is not exist')
  }

  const loaders = loader(pathRoot)

  for (const name in loaders) {
    internals[name] = loaders[name]
  }
}

module.exports.get = function (keys, defaultValue = null) {
  return get(internals, keys, defaultValue)
}

module.exports.set = function (keys, defaultValue = null) {
  return set(internals, keys, defaultValue)
}
