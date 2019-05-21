'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            mobileno: {
                type: Sequelize.STRING(255),
                unique: true,
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            locality_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            home_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            field_boy_id: {
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
        return queryInterface.dropTable('customers');
    }
};