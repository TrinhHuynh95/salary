const path = require('path')
const allowedOrigins = process.env.ALLOWED_ORIGINS || ''
const env = (process.env.NODE_ENV || 'dev').trim()

module.exports = {
  env,
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
  allowed_origins: allowedOrigins.split(',').map(url => url.trim()),
  sys_paths: {
    repository: path.resolve(__dirname, '../repositories'),
    seed: path.resolve(__dirname, '../db/seeds'),
    migrate: path.resolve(__dirname, '../db/migrations'),
    provider: path.resolve(__dirname, '../providers'),
    route: path.resolve(__dirname, '../routes'),
    view: path.resolve(__dirname, '../views'),
    lang: path.resolve(__dirname, '../lang'),
    assets: path.resolve(__dirname, '../../public')
  }
}
