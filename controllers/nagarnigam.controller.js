'use strict';
const { nagar_nigam, city, state , user  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of nagar_nigam.');
    }else {
        let err, nagarnigams, users;
        body.role_id = 16 ;
        [err, users] = await to(user.create(body));

        if (err) return ReE(res, { message: 'Mobile No already exists. Please try another.' }, 422);

        if (users) {
            body.user_id = users.id;
            [err, nagarnigams]   =   await to(nagar_nigam.create(body));
            if (err) {
                user.destroy({
                    where: { id: users.id }
                });
                return ReE(res, { message: 'Nagar Nigam already exists. Please try another.' }, 422);
            }
            return ReS(res, {message: 'Successfully created new nagar_nigam.', nagarnigam:nagarnigams.toWeb()}, 201);
        } else {
            return ReE(res, { message: 'Nagar Nigam registration failed.' }, 422);
        }
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, nagarnigams;

    [err, nagarnigams]   =   await to(nagar_nigam.findAll({
        order:[['name','ASC']],
        include:[{model:city},{model:state}]
    }));

    if (err)    ReE(res, err, 422);

    let  nagarnigam_json    =   [];

    for(let i in nagarnigams)   {
        let nagarnigamsdetails = nagarnigams[i];
        let nagarnigams_info = nagarnigamsdetails.toWeb();
        nagarnigam_json.push(nagarnigams_info);
    }
    return ReS(res, {nagarnigams: nagarnigam_json});
};

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, nagarnigams;

    [err, nagarnigams]    =   await to(nagar_nigam.findAll({
        where: {
            city_id:id
        },
        order:[['name','ASC']],
        include:[{model:City}]
    }));

    if (err)    return ReE(res, err, 422);

    let nagarnigam_json    =   [];
    for (let i in nagarnigams) {
        let details     =    nagarnigams[i];
        let info        =    details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {nagarnigams: nagarnigam_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, nagarnigam, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of nagar_nigam.');
    }else {

        [err, nagarnigam] = await to(nagar_nigam.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of nagar_nigam is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated nagar_nigam : '+ data.name});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let nagarnigam, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, nagarnigam] = await to(nagar_nigam.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete nagar_nigam');

    return ReS(res, {message:'Deleted nagar_nigam'}, 204);

};
module.exports.remove = remove;