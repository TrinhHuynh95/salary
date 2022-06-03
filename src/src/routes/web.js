const Home = require('../controllers/home')
const config = require('../lib/config')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: Home.index
  },
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: config.get('app.sys_paths.assets')
      }
    }
  }
]
