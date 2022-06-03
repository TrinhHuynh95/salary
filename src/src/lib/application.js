const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const Hapi = require('@hapi/hapi')

const config = require('./config')
const lang = require('./lang')
const database = require('./database')
const loader = require('./helpers/loader')

class Application {
  pathConfig = null
  envPath = null
  logger = null
  routes = []

  constructor (logger) {
    this.logger = logger
  }

  async init () {
    this.initEnv()
    this.loadConfig()
    this.loadLang()
    await this.initDatabase()
    this.makeRouter()
  }

  initEnv () {
    if (!this.envPath) {
      this.envPath = path.resolve(__filename, '../../')
    }
    const env = (process.env.NODE_ENV || 'dev').trim()
    const envPath = path.resolve(this.envPath, '../.env.' + env)

    if (!fs.existsSync(envPath)) {
      throw new Error(`Env(${envPath}) for ${env} is not exist`)
    }

    dotenv.config({ path: envPath })

    return this
  }

  loadConfig () {
    if (!this.pathConfig) {
      this.pathConfig = path.resolve(__filename, '../../config')
    }
    config.init(this.pathConfig)

    return this
  }

  loadLang () {
    lang.init(config.get('app.sys_paths.lang'))

    return this
  }

  async initDatabase () {
    const driver = config.get('database.driver')
    await database.connect(driver, config.get(`database.connections.${driver}`, {}))

    return database
  }

  async runServer () {
    const port = config.get('app.port', 3000)
    const host = config.get('app.host', 'localhost')
    const server = Hapi.server({
      port,
      host,
      routes: {
        cors: {
          origin: config.get('app.allowed_origins')
        }
      }
    })
    await server.register([require('@hapi/vision'), require('@hapi/inert')])
    server.views({
      engines: { pug: require('pug') },
      path: config.get('app.sys_paths.view'),
      compileOptions: {
        pretty: false,
        debug: !process.env.NODE_ENV.trim() === 'prod'
      },
      isCached: process.env.NODE_ENV.trim() === 'prod'
    })
    this.routes.forEach(item => server.route(item))
    await server.start()
    this.logger.log(`server is running at ${port}`)
  }

  makeRouter () {
    const resLoader = loader(config.get('app.sys_paths.route'))
    for (const name in resLoader) {
      this.routes.push(
        ...resLoader[name].map(item => {
          if (typeof item.handler === 'function') {
            const older = item.handler
            item.handler = async (request, h) => {
              const res = await older(request, h)
              if (res.source?.context) {
                res.source.context = {
                  ...res.source?.context,
                  sys: {
                    require: (p) => require(
                      p.indexOf('src') !== -1
                        ? path.resolve(__dirname, '../../', p)
                        : p
                    )
                  }
                }
              }
              return res
            }
          }
          if (name === 'web') {
            return item
          }
          item.path = `/${name}${item.path}`
          return item
        })
      )
    }
    return this
  }
}

module.exports = Application
