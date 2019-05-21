'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 2
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
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
            logdate: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Login time",
            },
            lognum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "Total Login time",
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
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
        return queryInterface.dropTable('users');
    }
};