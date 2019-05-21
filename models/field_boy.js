'use strict';
module.exports = (sequelize, DataTypes) => {
    const field_boy = sequelize.define('field_boy', {
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        locality_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    field_boy.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.user,{foreignKey:'user_id',sourceKey:'id'});
        this.belongsTo(models.locality,{foreignKey:'locality_id',sourceKey:'id'});
        this.hasMany(models.customer, {foreignKey: 'field_boy_id', sourceKey: 'id'});
        this.hasMany(models.usergps_tracking, {foreignKey: 'fieldboy_id', sourceKey: 'id'});
        this.hasMany(models.customer_account_detail, {foreignKey: 'paid_by', sourceKey: 'id'});
    };
    field_boy.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return field_boy;
};