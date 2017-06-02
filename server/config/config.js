require('dotenv').config();

module.exports = {
  development: {
    password: null,
    database: 'datab',
    host: '127.0.0.1',
    dialect: 'mysql'

  },
  test: {
    password: null,
    database: 'doc-test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
