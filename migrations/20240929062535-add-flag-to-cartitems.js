"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cartitems", "flag", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // or true, depending on your logic
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cartitems", "flag");
  },
};
