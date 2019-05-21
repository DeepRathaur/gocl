'use strict';

const { usergps_tracking,user ,field_boy} = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const sequelize = require('sequelize');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, usergpstracking;

    [err, usergpstracking] = await to(usergps_tracking.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new usergpstracking.', usergpstracking: usergpstracking.toWeb() }, 201);

};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, usergpstracking;

    [err, usergpstracking] = await to(usergps_tracking.findAll({
        order: [['createdAt', 'DESC']],
        include:[{model:user},{model:field_boy}]
    }));

    if (err) return ReE(res, err, 422);

    let usergpstracking_json = [];
    for (let i in usergpstracking) {
        let details = usergpstracking[i];
        let info = details.toWeb();
        usergpstracking_json.push(info);
    }
    return ReS(res, { usergpstracking: usergpstracking_json });
};
module.exports.getAll = getAll;


const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, usergpstracking;
    let id = parseInt(req.params.id);
    [err, usergpstracking] = await to(usergps_tracking.findAll({
        where: {
            user_id: id
        },
        order: [['createdAt', 'DESC']],
        include:[{model:user},{model:field_boy}]
    }));

    if (err) return ReE(res, err, 422);

    let employee_json = [];

    for (let i in usergpstracking) {
        let details = usergpstracking[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { usergpstracking: employee_json });
};

module.exports.getOne = getOne;

const getByDate = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, usergpstracking;
    let id      =   parseInt(req.params.id);
    let date    =   (req.params.date);
    [err, usergpstracking] = await to(usergps_tracking.findAll({
        where: sequelize.and(sequelize.where(sequelize.fn('DATE', sequelize.col('usergps_tracking.createdAt')), date),
            sequelize.where(sequelize.col('user_id'),id)),
        order: [['createdAt', 'DESC']],
        include:[{model:user},{model:field_boy}]
    }));

    if (err) return ReE(res, err, 422);

    let employee_json = [];

    for (let i in usergpstracking) {
        let details = usergpstracking[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { usergpstracking: employee_json });
};

module.exports.getByDate = getByDate;

const getByReporingM = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, usergpstracking,organisationtree;
    let id      =   parseInt(req.params.rmid);
    let date    =   (req.params.date);
    [err, organisationtree] = await to(organization_tree.findAll({
        where:{
            manager_employee_id:id
        }
    }));

    if (err) return ReE(res, err, 422);
    let employee_json = [];
    for (let i in organisationtree) {
        let empid = organisationtree[i].employee_id;
        [err, usergpstracking] = await to(usergps_tracking.findAll({
            where: sequelize.and(sequelize.where(sequelize.fn('DATE', sequelize.col('usergps_tracking.createdAt')), date),
                sequelize.where(sequelize.col('employee_id'),empid)),
            order: [['createdAt', 'DESC']],
            include:[{model:Employee,attributes:['id','first_name','last_name','is_enable_mobile']}]
        }));

        if (err) return ReE(res, err, 422);

        for (let i in usergpstracking) {
            let details = usergpstracking[i];
            let info = details.toWeb();
            employee_json.push(info);
        }
    }
    return ReS(res, { usergpstracking: employee_json });
};

module.exports.getByReporingM = getByReporingM;


const remove = async function (req, res) {
    let usergpstrackings, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, usergpstrackings] = await to(usergps_tracking.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete usergpstracking');

    return ReS(res, { message: 'Deleted usergpstracking' }, 204);

};
module.exports.remove = remove;