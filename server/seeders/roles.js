module.exports = {
  up(queryInterface) {
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
  down(queryInterface) {
    return queryInterface.bulkDelete('Roles', { title: [
      'Admin',
      'Regular User'] }, {});
  }
};
