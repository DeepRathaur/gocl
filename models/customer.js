'use strict';
module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define('customer', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        mobileno: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        locality_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        home_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        field_boy_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    customer.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.locality, {foreignKey: 'locality_id', sourceKey: 'id'});
        this.belongsTo(models.field_boy, {foreignKey: 'field_boy_id', sourceKey: 'id'});
        this.belongsTo(models.home_type, {foreignKey: 'home_type_id', sourceKey: 'id'});
        this.hasMany(models.customer_account_detail, {foreignKey: 'customer_id', sourceKey: 'id'});
    };
    customer.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return customer;
};