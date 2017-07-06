const bcrypt = require('bcryptjs');

require('dotenv').config();

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: process.env.ADMIN_FIRST_NAME,
        lastName: process.env.ADMIN_LAST_NAME,
        email: process.env.ADMIN_EMAIL,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Nire',
        lastName: 'Ajayi',
        email: 'nire@gmil.com',
        roleId: 2,
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Mure',
        lastName: 'Ajayi',
        email: 'mure@gmil.com',
        roleId: 2,
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Adun',
        lastName: 'Ajayi',
        email: 'adun@gmil.com',
        roleId: 2,
        password: bcrypt.hashSync(process.env.USER_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      email: [
        process.env.ADMIN_EMAIL,
        'adun@gmil.com',
        'mure@gmil.com',
        'adun@gmil.com']
    }, {});
  }
};
