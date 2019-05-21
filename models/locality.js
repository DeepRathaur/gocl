'use strict';
module.exports = (sequelize, DataTypes) => {
    const locality = sequelize.define('locality', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    locality.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.state, {foreignKey: 'state_id', sourceKey: 'id'});
        this.belongsTo(models.city, {foreignKey: 'city_id', sourceKey: 'id'});
        this.hasMany(models.nagar_nigam_office, {foreignKey: 'locality_id', sourceKey: 'id'});
        this.hasMany(models.field_boy, {foreignKey: 'locality_id', sourceKey: 'id'});
        this.hasMany(models.customer, {foreignKey: 'locality_id', sourceKey: 'id'});
        this.hasMany(models.supervisor, {foreignKey: 'locality_id', sourceKey: 'id'});
    };
    locality.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return locality;
};