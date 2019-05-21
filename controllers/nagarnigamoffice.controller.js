'use strict';
const { nagar_nigam, nagar_nigam_office, user  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of nagar nigam office.');
    }else {
        let err, nagarnigamoffices, users;
        body.role_id = 8 ;
        [err, users] = await to(user.create(body));

        if (err) return ReE(res, { message: 'Mobile No already exists. Please try another.' }, 422);

        if (users) {
            body.user_id = users.id;
            [err, nagarnigamoffices]   =   await to(nagar_nigam_office.create(body));
            if (err) {
                user.destroy({
                    where: { id: users.id }
                });
                return ReE(res, { message: 'Nagar Nigam Office already exists. Please try another.' }, 422);
            }
            return ReS(res, {message: 'Successfully created new Nagar Nigam Office.', nagarnigamoffice:nagarnigamoffices.toWeb()}, 201);
        } else {
            return ReE(res, { message: 'Nagar Nigam Office registration failed.' }, 422);
        }
    }
};

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, nagarnigamoffices;

    [err, nagarnigamoffices]   =   await to(nagar_nigam_office.findAll({
        order:[['name','ASC']],
        include:[{model:nagar_nigam}]
    }));

    if (err)    ReE(res, err, 422)

    let  nagarnigam_json    =   []

    for(let i in nagarnigamoffices)   {
        let nagarnigamofficesdetails = nagarnigamoffices[i];
        let nagarnigamoffices_info = nagarnigamofficesdetails.toWeb();
        nagarnigam_json.push(nagarnigamoffices_info);
    }
    return ReS(res, {nagarnigamoffices: nagarnigam_json});
};

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, nagarnigamoffices;

    [err, nagarnigamoffices]    =   await to(nagar_nigam_office.findAll({
        where: {
            nagar_nigam_id:id
        },
        order:[['name','ASC']],
        include:[{model:nagar_nigam}]
    }));

    if (err)    return ReE(res, err, 422);

    let nagarnigam_json    =   [];
    for (let i in nagarnigamoffices) {
        let details     =    nagarnigamoffices[i];
        let info        =    details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {nagarnigamoffices: nagarnigam_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, nagarnigam, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of nagar_nigam.');
    }else {

        [err, nagarnigam] = await to(nagar_nigam_office.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of nagar nigam is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated nagar nigam'});
    }
};

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let nagarnigam, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, nagarnigam] = await to(nagar_nigam_office.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete nagar_nigam_office');

    return ReS(res, {message:'Deleted nagar_nigam_office'}, 204);

};
module.exports.remove = remove;