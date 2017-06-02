require('dotenv').config();

module.exports = {
  development: {
    password: null,
    database: 'datab',
    host: '127.0.0.1',
    dialect: 'mysql'

  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
