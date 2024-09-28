"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true, // Make sure it's nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "deletedAt");
  },
};
