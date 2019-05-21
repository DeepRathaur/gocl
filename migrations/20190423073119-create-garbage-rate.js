'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('garbage_rates', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            home_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1,
                allowNull: false
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('garbage_rates');
    }
};