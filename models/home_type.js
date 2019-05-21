'use strict';
module.exports = (sequelize, DataTypes) => {
    const home_type = sequelize.define('home_type', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    home_type.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.garbage_rate,{foreignKey:'home_type_id',sourceKey:'id'});
        this.hasMany(models.customer,{foreignKey:'home_type_id',sourceKey:'id'});
    };
    home_type.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return home_type;
};