'use strict';
const {customer,home_type, locality, field_boy} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');


const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.name) {
        return ReE(res, 'Please enter a name of customer.');
    } else {
        let err, customers;
        [err, customers] = await to(customer.create(body));

        if (err) return ReE(res, {message: 'customers already exists. Please try another.'}, 422);
        return ReS(res, {message: 'Successfully created new customer.', customers: customers.toWeb()}, 201);

    }
};

module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, customers;

    [err, customers] = await to(customer.findAll({
        order: [['name', 'ASC']],
        include: [{model: locality},{model: home_type}, {model: field_boy}]
    }));

    if (err) ReE(res, err, 422);

    let nagarnigam_json = [];

    for (let i in customers) {
        let customersdetails = customers[i];
        let customers_info = customersdetails.toWeb();
        nagarnigam_json.push(customers_info);
    }
    return ReS(res, {customers: nagarnigam_json});
};

module.exports.getAll = getAll;

const getOne = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, customers;

    [err, customers] = await to(customer.findAll({
        where: {
            id: id
        },
        order: [['name', 'ASC']],
        include: [{model: locality},{model: home_type}]
    }));

    if (err) return ReE(res, err, 422);

    let nagarnigam_json = [];
    for (let i in customers) {
        let details = customers[i];
        let info = details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {customers: nagarnigam_json});
};

module.exports.getOne = getOne;


const getByFieldBoy = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.fieldboyid);
    let err, customers;

    [err, customers] = await to(customer.findAll({
        where: {
            field_boy_id: id
        },
        order: [['name', 'ASC']],
        include: [{model: locality},{model: home_type}]
    }));

    if (err) return ReE(res, err, 422);

    let nagarnigam_json = [];
    for (let i in customers) {
        let details = customers[i];
        let info = details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {customers: nagarnigam_json});
};

module.exports.getByFieldBoy = getByFieldBoy;

const update = async function (req, res) {
    let err, customers, data;
    let id = req.params.id;
    data = req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of customer.');
    } else {

        [err, customers] = await to(customer.update(data, {
            where: {id: id}
        }));

        if (err) {
            if (err.message == 'Validation error') err = 'The name of customer is already exist';
            return ReE(res, err);
        }
        return ReS(res, {message: 'Updated customer'});
    }
};

module.exports.update = update;

const remove = async function (req, res) {
    let customers, err;
    let id = req.params.id;
    data = req.body;
    [err, customers] = await to(customer.destroy({
        where: {id: id}
    }));

    if (err) return ReE(res, 'error occured trying to delete customer');

    return ReS(res, {message: 'Deleted customer'}, 204);

};
module.exports.remove = remove;