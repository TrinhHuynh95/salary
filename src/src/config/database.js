module.exports = {
  driver: process.env.DB_CONNECTION || 'mysql',
  connections: {
    mysql: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || ''
    },
    mongodb: {
      url: process.env.DB_URL || 'mongodb://',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '27017',
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || ''
    }
  }
}
