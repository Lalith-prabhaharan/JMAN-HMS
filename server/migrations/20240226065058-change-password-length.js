'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Doctors',
      'password',
      {
        type: Sequelize.STRING(250)
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Doctors',
      'password',
      {
        type: Sequelize.STRING(50)
      }
    )
  }
};
