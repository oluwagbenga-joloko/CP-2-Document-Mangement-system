require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'postgres',
    logging: false

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
