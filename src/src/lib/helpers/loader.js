const fs = require('fs')
const path = require('path')

const name = (filename, ext) => path.basename(filename).replace(ext, '')

module.exports = (rootPath, ext = '.js') => {
  const loaders = {}
  if (fs.lstatSync(rootPath).isDirectory()) {
    fs.readdirSync(path.resolve(rootPath)).forEach(filename => {
      if (filename.indexOf(ext) !== -1) {
        loaders[name(filename, ext)] = require(path.resolve(rootPath, filename))
      }
    })
  } else {
    loaders[name(rootPath, ext)] = require(path.resolve(rootPath))
  }

  return loaders
}
