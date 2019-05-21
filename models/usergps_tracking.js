'use strict';
module.exports = (sequelize, DataTypes) => {
    const usergps_tracking = sequelize.define('usergps_tracking', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fieldboy_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lattitude: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        longitude: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    usergps_tracking.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.user, {foreignKey: 'user_id', sourceKey: 'id'});
        this.belongsTo(models.field_boy, {foreignKey: 'fieldboy_id', sourceKey: 'id'});
    };
    usergps_tracking.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return usergps_tracking;
};