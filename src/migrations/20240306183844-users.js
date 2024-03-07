'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      display_name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.dropTable('users')
  }
};
