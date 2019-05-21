'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('states', [
          {"id":"4","name":"Maharashtra","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"5","name":"Andaman & Nicobar Islands","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"6","name":"Andhra Pradesh","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"7","name":"Arunachal Pradesh","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"8","name":"Assam","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"9","name":"Bihar","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"10","name":"Chhattisgarh","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"11","name":"Dadra & Nagar Haveli","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"12","name":"Daman & Diu","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"13","name":"Delhi","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"14","name":"Goa","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"15","name":"Gujarat","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"19","name":"Haryana","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"20","name":"Himachal Pradesh","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"21","name":"Jammu & Kashmir","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"22","name":"Jharkhand","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"23","name":"Karnataka","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"24","name":"Kerala","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"25","name":"Lakshadweep","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"26","name":"Madhya Pradesh","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"28","name":"Manipur","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"29","name":"Meghalaya","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"30","name":"Mizoram","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"31","name":"Nagaland","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"32","name":"Orissa","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"33","name":"Pondicherry","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"34","name":"Punjab","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"35","name":"Rajasthan","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"37","name":"Sikkim","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"38","name":"West Bengal","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"39","name":"Tamil Nadu","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"40","name":"Tripura","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"41","name":"Uttar Pradesh","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"48","name":"Uttarakhand","zone":null,"createdAt":"2018-12-07 11:01:33","updatedAt":"2018-12-07 11:01:33"},
          {"id":"49","name":"Telangana","zone":null,"createdAt":"2018-12-21 17:55:13","updatedAt":"2018-12-21 17:55:13"}], {});
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
