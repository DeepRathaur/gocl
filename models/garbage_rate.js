'use strict';
module.exports = (sequelize, DataTypes) => {
    const garbage_rate = sequelize.define('garbage_rate', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        home_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    garbage_rate.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.home_type, {foreignKey: 'home_type_id', sourceKey: 'id'});
    };
    garbage_rate.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return garbage_rate;
};