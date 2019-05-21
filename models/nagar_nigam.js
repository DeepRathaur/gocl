'use strict';
module.exports = (sequelize, DataTypes) => {
    const nagar_nigam = sequelize.define('nagar_nigam', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        mobileno: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_id : {
            type: DataTypes.INTEGER,
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
    nagar_nigam.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.state,{foreignKey:'state_id',sourceKey:'id'});
        this.belongsTo(models.city,{foreignKey:'city_id',sourceKey:'id'});
        this.belongsTo(models.user,{foreignKey:'user_id',sourceKey:'id'});
        this.hasMany(models.nagar_nigam_office,{foreignKey:'nagar_nigam_id',sourceKey:'id'});
    };
    nagar_nigam.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return nagar_nigam;
};