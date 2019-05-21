'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('usergps_trackings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            fieldboy_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            lattitude: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            longitude: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue:1,
                allowNull:false
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
        return queryInterface.dropTable('usergps_trackings');
    }
};