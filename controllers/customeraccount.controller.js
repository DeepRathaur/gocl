'use strict';
const {customer_account_detail, user, customer, field_boy} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.amount) {
        return ReE(res, 'Please enter a name of customer account details.');
    } else {
        let err, customeraccountdetail;

        [err, customeraccountdetail] = await to(customer_account_detail.create(body));
        if (err) return ReE(res, {message: 'Something was wrong. Please try some time.'}, 422);

        return ReS(res, {
            message: 'Successfully created new Customer account details.',
            customeraccountdetail: customeraccountdetail.toWeb()
        }, 201);
    }
};

module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, customeraccountdetail;

    [err, customeraccountdetail] = await to(customer_account_detail.findAll({
        order: [['createdAt', 'ASC']],
        include: [{model: field_boy}, {model: customer}]
    }));

    if (err) ReE(res, err, 422)

    let nagarnigam_json = []

    for (let i in customeraccountdetail) {
        let customeraccountdetaildetails = customeraccountdetail[i];
        let customeraccountdetail_info = customeraccountdetaildetails.toWeb();
        nagarnigam_json.push(customeraccountdetail_info);
    }
    return ReS(res, {customeraccountdetail: nagarnigam_json});
};

module.exports.getAll = getAll;

const getOne = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, customeraccountdetail;

    [err, customeraccountdetail] = await to(customer_account_detail.findAll({
        where: {
            paid_by: id
        },
        order: [['createdAt', 'ASC']],
        include: [{model: field_boy}, {model: customer}]
    }));

    if (err) return ReE(res, err, 422);

    let nagarnigam_json = [];
    for (let i in customeraccountdetail) {
        let details = customeraccountdetail[i];
        let info = details.toWeb();
        nagarnigam_json.push(info);
    }
    return ReS(res, {customeraccountdetail: nagarnigam_json});
};

module.exports.getOne = getOne;


const update = async function (req, res) {
    let err, customeraccountdetail, data;
    let id = req.params.id;
    data = req.body;
    if (!data.amount) {
        return ReE(res, 'Please enter a name of customeraccountdetail.');
    } else {

        [err, customeraccountdetail] = await to(customer_account_detail.update(data, {
            where: {id: id}
        }));

        if (err) {
            if (err.message == 'Validation error') err = 'The name of customeraccountdetail is already exist';
            return ReE(res, err);
        }
        return ReS(res, {message: 'Updated customeraccountdetail'});
    }
};

module.exports.update = update;

const remove = async function (req, res) {
    let customeraccountdetail, err;
    let id = req.params.id;
    data = req.body;
    [err, customeraccountdetail] = await to(customer_account_detail.destroy({
        where: {id: id}
    }));

    if (err) return ReE(res, 'error occured trying to delete customer_account_detail');

    return ReS(res, {message: 'Deleted customer_account_detail'}, 204);

};
module.exports.remove = remove;