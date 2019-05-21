'use strict';
const { supervisor, nagar_nigam_office, locality, user  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of Supervisor.');
    }else {
        let err, supervisors, users;
        body.role_id = 4 ;
        [err, users] = await to(user.create(body));

        if (err) return ReE(res, { message: 'Mobile No already exists. Please try another.' }, 422);

        if (users) {
            body.user_id = users.id;
            [err, supervisors]   =   await to(supervisor.create(body));
            if (err) {
                user.destroy({
                    where: { id: users.id }
                });
                return ReE(res, { message: 'supervisors already exists. Please try another.' }, 422);
            }
            return ReS(res, {message: 'Successfully created new supervisor.', supervisors:supervisors.toWeb()}, 201);
        } else {
            return ReE(res, { message: 'supervisors registration failed.' }, 422);
        }
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, supervisors;

    [err, supervisors]   =   await to(supervisor.findAll({
        order:[['name','ASC']],
        include:[{model:locality},{model:nagar_nigam_office},{model:user}]
    }));

    if (err)    ReE(res, err, 422);

    let  nagarnigam_json    =   [];

    for(let i in supervisors)   {
        let supervisorsdetails = supervisors[i];
        let supervisors_info = supervisorsdetails.toWeb();
        nagarnigam_json.push(supervisors_info);
    }
    return ReS(res, {supervisors: nagarnigam_json});
};

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, supervisors;

    [err, supervisors]    =   await to(supervisor.findAll({
        where: {
            locality_id:id
        },
        order:[['name','ASC']],
        include:[{model:locality},{model:nagar_nigam_office}]
    }));

    if (err)    return ReE(res, err, 422);

    let nagarnigam_json    =   [];
    for (let i in supervisors) {
        let details     =    supervisors[i];
        let info        =    details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {supervisors: nagarnigam_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, nagarnigam, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of supervisor.');
    }else {

        [err, nagarnigam] = await to(supervisor.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of supervisor is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated supervisor'});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let nagarnigam, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, nagarnigam] = await to(supervisor.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete supervisor');

    return ReS(res, {message:'Deleted supervisor'}, 204);

};
module.exports.remove = remove;