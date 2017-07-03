require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'true',

  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
};
