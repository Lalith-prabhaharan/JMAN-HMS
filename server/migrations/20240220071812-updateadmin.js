'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Admins', 'user', 'username');
    await queryInterface.renameColumn('Admins', 'pass', 'password');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Admins', 'username', 'user');
    await queryInterface.renameColumn('Admins', 'password', 'pass');
  }
};
