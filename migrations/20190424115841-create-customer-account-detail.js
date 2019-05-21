'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('customer_account_details', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            review_by: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            review_status: {
                type: Sequelize.STRING(200),
                allowNull: true             // Pending , Successfull
            },
            paid_by: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            is_paid: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0,
                allowNull: false
            },
            month: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            remarks: {
                type: Sequelize.TEXT,
                allowNull: true
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
        return queryInterface.dropTable('customer_account_details');
    }
};