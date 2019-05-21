'use strict';
const { user, Role } = require('../models');
const multer = require('multer');
const path = require('path');
const PRAMAS = require('../config/globalparam');

const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    const body = req.body;
    if (!body.mobileno) {
        return ReE(res, 'Please enter mobile no to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;
        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);

        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
};

module.exports.create = create;

const login = async function (req, res) {
    const body = req.body;
    //console.log(body);
    let err, users;
    [err, users] = await to(authService.authUser(req.body));
    console.log(err);
    if (err) return ReE(res, err, 422);

    if (users) {
        if (users.status == true) {
            let lognum = users.lognum += 1;
            user.update({
                logdate: new Date(),
                lognum: lognum,
            }, {
                    where: {
                        id: users.id,
                    }
                });
        }
        return ReS(res, { token: users.getJWT(), user: users.toWeb() });
    }
};
module.exports.login = login;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, users;

    [err, users] = await to(user.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) ReE(res, err, 422)

    let user_json = []

    for (let i in users) {
        let details = users[i];
        let userinfo = details.toWeb();
        user_json.push(userinfo);
    }

    return ReS(res, { users: user_json });
};

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, users;
    let id = req.params.id;

    [err, users] = await to(user.findAll({
        where: {
            id: id,
            status: 1
        },
        order: [['name', 'ASC']]
    }));

    if (err) ReE(res, err, 422);

    let user_json = [];

    for (let i in users) {
        let details = users[i];
        let userinfo = details.toWeb();
        user_json.push(userinfo);
    }

    return ReS(res, { users: user_json });
};

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, users, data
    users = req.user;
    data = req.body;
    users.set(data);

    [err, users] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The  mobile number is already in use';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User: ' });
};
module.exports.update = update;

const remove = async function (req, res) {
    let users, err;
    let id = req.params.id;
    [err, users] = await to(user.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted User' }, 204);

};
module.exports.remove = remove;
