'use strict';
const { garbage_rate, home_type  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.amount)   {
        return ReE(res, 'Please enter amount of garbage rate.');
    }else {
        let err, garbagerates;

        [err, garbagerates]   =   await to(garbage_rate.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new garbage_rate.', garbage_rate:garbagerates.toWeb()}, 201);
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, garbagerates;

    [err, garbagerates]   =   await to(garbage_rate.findAll({
        order:[['name','ASC']],
        include:[{model:home_type}]
    }));

    if (err)    ReE(res, err, 422)

    let  garbage_rate_json    =   []

    for(let i in garbagerates)   {
        let garbageratesdetails = garbagerates[i];
        let garbagerates_info = garbageratesdetails.toWeb();
        garbage_rate_json.push(garbagerates_info);
    }
    return ReS(res, {garbagerates: garbage_rate_json});
};

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, garbagerates;

    [err, garbagerates]    =   await to(garbage_rate.findAll({
        where: {
            home_type_id:id
        },
        order:[['name','ASC']],
        include:[{model:home_type}]
    }));

    if (err)    return ReE(res, err, 422);

    let garbage_rate_json    =   [];
    for (let i in garbagerates) {
        let details     =    garbagerates[i];
        let info        =    details.toWeb();
        garbage_rate_json.push(info);
    }
    return ReS(res, {garbagerates: garbage_rate_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, garbagerates, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.amount) {
        return ReE(res, 'Please enter a amount of garbage_rate.');
    }else {

        [err, garbagerates] = await to(garbage_rate.update({
            amount: data.amount,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of garbage_rate is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated garbage_rate : '+ data.name});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let garbagerates, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, garbagerates] = await to(garbage_rate.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete garbage_rate');

    return ReS(res, {message:'Deleted garbage_rate'}, 204);

};
module.exports.remove = remove;