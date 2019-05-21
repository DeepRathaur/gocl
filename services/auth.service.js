const { user } = require('../models');
const validator = require('validator');
const { to, TE, ReE } = require('../services/util.service');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const createUser = async (userInfo) => {
    let users,unique_key, auth_info, err;

    auth_info = {};
    auth_info.status = 'create';

    unique_key = (userInfo.mobileno);

    if (!unique_key) TE('An mobileno  was not entered.');

    if (validator.isMobilePhone(unique_key)) {
        auth_info.method = 'mobileno';
        userInfo.mobileno = unique_key;
        [err, users] = await to(user.create(userInfo));
        if (err) TE('user already exists with that mobile no');
        return users;
    } else {
        TE('A valid mobile no  was not entered.');
    }
};
module.exports.createUser = createUser;


const authUser = async function (userInfo) {          //returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = (userInfo.mobileno);
    if (!unique_key) TE('Please enter mobile number to login');

    if (!userInfo.password) TE('Please enter a password to login');

    let users;
    if (validator.isMobilePhone(unique_key)) {

        auth_info.method = 'mobileno';

        [err, users] = await to(user.findOne({
            attributes: ['id', 'name', 'uuid', 'password', 'lognum', 'status'],
            where: {
                mobileno:unique_key
            }
        }));
        if (err) TE(err.message);

    }  else {
        TE('A valid mobile number was not entered');
    }

    if (!users) TE('Not registered yet');

    [err, users] = await to(users.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return users;
};
module.exports.authUser = authUser;
