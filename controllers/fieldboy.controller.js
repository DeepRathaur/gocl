'use strict';
const { field_boy, locality, user  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of field boy.');
    }else {
        let err, fieldboys, users;
        body.role_id = 2 ;
        [err, users] = await to(user.create(body));

        if (err) return ReE(res, { message: 'Mobile No already exists. Please try another.' }, 422);

        if (users) {
            body.user_id = users.id;
            [err, fieldboys]   =   await to(field_boy.create(body));
            if (err) {
                user.destroy({
                    where: { id: users.id }
                });
                return ReE(res, { message: 'fieldboys already exists. Please try another.' }, 422);
            }
            return ReS(res, {message: 'Successfully created new field_boy.', fieldboys:fieldboys.toWeb()}, 201);
        } else {
            return ReE(res, { message: 'fieldboys registration failed.' }, 422);
        }
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, fieldboys;

    [err, fieldboys]   =   await to(field_boy.findAll({
        order:[['name','ASC']],
        include:[{model:locality}]
    }));

    if (err)    ReE(res, err, 422)

    let  nagarnigam_json    =   []

    for(let i in fieldboys)   {
        let fieldboysdetails = fieldboys[i];
        let fieldboys_info = fieldboysdetails.toWeb();
        nagarnigam_json.push(fieldboys_info);
    }
    return ReS(res, {fieldboys: nagarnigam_json});
};

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, fieldboys;

    [err, fieldboys]    =   await to(field_boy.findAll({
        where: {
            locality_id:id
        },
        order:[['name','ASC']],
        include:[{model:locality}]
    }));

    if (err)    return ReE(res, err, 422);

    let nagarnigam_json    =   [];
    for (let i in fieldboys) {
        let details     =    fieldboys[i];
        let info        =    details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {fieldboys: nagarnigam_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, nagarnigam, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of field_boy.');
    }else {

        [err, nagarnigam] = await to(field_boy.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of field_boy is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated field_boy'});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let nagarnigam, err ;
    let id = req.params.id;

    [err, nagarnigam] = await to(field_boy.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete field_boy');

    return ReS(res, {message:'Deleted field_boy'}, 204);

};
module.exports.remove = remove;