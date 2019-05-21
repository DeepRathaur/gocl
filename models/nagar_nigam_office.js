'use strict';
module.exports = (sequelize, DataTypes) => {
    const nagar_nigam_office = sequelize.define('nagar_nigam_office', {
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
        nagar_nigam_id: {
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
    nagar_nigam_office.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.user,{foreignKey:'user_id',sourceKey:'id'});
        this.belongsTo(models.nagar_nigam,{foreignKey:'nagar_nigam_id',sourceKey:'id'});
        this.belongsTo(models.locality,{foreignKey:'locality_id',sourceKey:'id'});
        this.hasMany(models.supervisor,{foreignKey:'nagar_nigam_office_id',sourceKey:'id'});
    };
    nagar_nigam_office.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return nagar_nigam_office;
};