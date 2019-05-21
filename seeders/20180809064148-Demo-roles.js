'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [{
            id: 1,
            name: 'guest',
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            id: 2,
            name: 'user',
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
            {
                id: 4,
                name: 'supervisor',
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            } ,
            {
                id: 8,
                name: 'officelogin',
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            } ,
            {
                id: 16,
                name: 'nagarniganlogin',
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            } ,
            {
                id: 32,
                name: 'admin',
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
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
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
