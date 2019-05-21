'use strict';
module.exports = (sequelize, DataTypes) => {
    const supervisor = sequelize.define('supervisor', {
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
        nagar_nigam_office_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    supervisor.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.user, {foreignKey: 'user_id', sourceKey: 'id'});
        this.belongsTo(models.locality, {foreignKey: 'locality_id', sourceKey: 'id'});
        this.belongsTo(models.nagar_nigam_office, {foreignKey: 'nagar_nigam_office_id', sourceKey: 'id'});
        this.hasMany(models.customer_account_detail, {foreignKey: 'user_id', sourceKey: 'id'});
    };
    supervisor.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return supervisor;
};