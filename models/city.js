'use strict';
module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('city', {
        name: DataTypes.STRING,
        state_id: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN
    }, {});
    City.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.state, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.locality, {foreignKey: 'city_id', sourceKey: 'id'});
        this.hasMany(models.nagar_nigam, {foreignKey: 'city_id', sourceKey: 'id'});
        // this.hasMany(models.User, {foreignKey: 'city_id', sourceKey: 'id'});
    };
    City.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return City;
};