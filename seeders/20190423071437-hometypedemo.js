'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('home_types', [
          {
          name: '1 BHK',
          status:'1',
          createdAt: new Date(),
          updatedAt: new Date(),
      },
          {
              name: '2 BHK',
              status:'1',
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
              name: '3 BHK',
              status:'1',
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
              name: '4 BHK',
              status:'1',
              createdAt: new Date(),
              updatedAt: new Date(),
          }
      ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
