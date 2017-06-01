module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        title: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Regular User',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', { title: [
      'Admin',
      'Regular User'] }, {});
  }
};
