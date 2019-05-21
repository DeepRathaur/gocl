'use strict';
const { locality, city, state  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of locality.');
    }else {
        let err, localties;

        [err, localties]   =   await to(locality.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new locality.', city:localties.toWeb()}, 201);
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, localties;

    [err, localties]   =   await to(locality.findAll({
        order:[['name','ASC']],
        include:[{model:city},{model:state}]
    }));

    if (err)    ReE(res, err, 422);

    let  city_json    =   [];

    for(let i in localties)   {
        let localtiesdetails = localties[i];
        let localties_info = localtiesdetails.toWeb();
        city_json.push(localties_info);
    }
    return ReS(res, {localties: city_json});
};

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, localties;

    [err, localties]    =   await to(locality.findAll({
        where: {
            city_id:id
        },
        order:[['name','ASC']],
        include:[{model:city},{model:state}]
    }));

    if (err)    return ReE(res, err, 422);

    let city_json    =   [];
    for (let i in localties) {
        let details     =    localties[i];
        let info        =    details.toWeb();
        city_json.push(info);
    }
    return ReS(res, {localties: city_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, city, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of locality.');
    }else {

        [err, city] = await to(locality.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of locality is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated locality : '+ data.name});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let city, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, city] = await to(locality.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete locality');

    return ReS(res, {message:'Deleted locality'}, 204);

};
module.exports.remove = remove;