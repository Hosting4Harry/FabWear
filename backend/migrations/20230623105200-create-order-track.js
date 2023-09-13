'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderTracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderitemid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orderitems',
          key: 'id'
        }
      },
      orderProcess: {
        type: Sequelize.BOOLEAN
      },
      qualitycheck: {
        type: Sequelize.BOOLEAN
      },
      shipped: {
        type: Sequelize.BOOLEAN
      },
      dispatched: {
        type: Sequelize.BOOLEAN
      },
      delivered: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderTracks');
  }
};