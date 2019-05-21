'use strict';
module.exports = (sequelize, DataTypes) => {
    const customer_account_detail = sequelize.define('customer_account_detail', {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        review_status: {
            type: DataTypes.STRING(200),
            allowNull: true             // Pending , Successfull
        },
        paid_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        is_paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {});

    customer_account_detail.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.customer, {foreignKey: 'customer_id', sourceKey: 'id'});
        this.belongsTo(models.supervisor, {foreignKey: 'review_by', sourceKey: 'id'});
        this.belongsTo(models.field_boy, {foreignKey: 'paid_by', sourceKey: 'id'});
    };

    customer_account_detail.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return customer_account_detail;
};