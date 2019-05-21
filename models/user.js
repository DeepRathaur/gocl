'use strict';

const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const {TE, to} = require('../services/util.service');
const PARAMS = require('../config/globalparam');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: PARAMS.userRoles.guest
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
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
        logdate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Login time",
        },
        lognum: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Total Login time",
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    user.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.role, {foreignKey: 'role_id', sourceKey: 'id'});
        this.hasMany(models.nagar_nigam, {foreignKey: 'user_id', sourceKey: 'id'});
        this.hasMany(models.nagar_nigam_office, {foreignKey: 'user_id', sourceKey: 'id'});
        this.hasMany(models.field_boy, {foreignKey: 'user_id', sourceKey: 'id'});
        this.hasMany(models.supervisor, {foreignKey: 'user_id', sourceKey: 'id'});
        this.hasMany(models.usergps_tracking, {foreignKey: 'user_id', sourceKey: 'id'});

    };
    user.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) TE(err.message, true);

            user.password = hash;
        }
    });

    user.prototype.comparePassword = async function (pw) {
        let err, pass;
        if (!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) TE(err);

        if (!pass) TE('invalid password');

        return this;
    };

    user.prototype.getJWT = function () {
        let expiration_time = parseInt(PARAMS.jwt_expiration);
        return "Bearer " + jwt.sign({user_id: this.id}, PARAMS.jwt_encryption, {expiresIn: expiration_time});
    };

    user.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return user;
};