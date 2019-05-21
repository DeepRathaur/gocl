'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('nagar_nigams', {
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
                allowNull: false,
                unique: true
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            user_id : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            state_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            city_id: {
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
        return queryInterface.dropTable('nagar_nigams');
    }
};