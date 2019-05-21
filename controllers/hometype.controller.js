'use strict';
const { home_type, garbage_rate  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of home type.');
    }else {
        let err, hometypes;

        [err, hometypes]   =   await to(home_type.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new home_type.', home_type:hometypes.toWeb()}, 201);
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, hometypes;

    [err, hometypes]   =   await to(home_type.findAll({
        order:[['name','ASC']],
        include:[{model:garbage_rate,attributes:['amount']}]
    }));

    if (err)    ReE(res, err, 422);

    let  home_type_json    =   [];

    for(let i in hometypes)   {
        let hometypesdetails = hometypes[i];
        let hometypes_info = hometypesdetails.toWeb();
        home_type_json.push(hometypes_info);
    }
    return ReS(res, {hometypes: home_type_json});
};

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    let err, hometypes, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of home_type.');
    }else {

        [err, hometypes] = await to(home_type.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of home_type is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated home_type : '+ data.name});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let hometypes, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, hometypes] = await to(home_type.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete home_type');

    return ReS(res, {message:'Deleted home_type'}, 204);

};
module.exports.remove = remove;