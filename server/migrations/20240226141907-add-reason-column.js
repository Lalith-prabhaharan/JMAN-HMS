'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Applications','reason', {
          type: Sequelize.DataTypes.STRING,
          defaulValue: null
        }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Applications', 'reason');
  }
};
