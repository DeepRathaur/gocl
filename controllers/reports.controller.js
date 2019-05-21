'use strict';
const {customer_account_detail, user, customer, field_boy} = require('../models');
const { ExportToCsv } = require('export-to-csv');
const { to, ReE, ReS }   = require('../services/util.service');
var data = [
    {
        name: 'Indu 1',
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
    },
    {
        name: 'Indu Mati 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
    },
    {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
    },
];
//
// const options = {
//     fieldSeparator: ',',
//     quoteStrings: '"',
//     decimalSeparator: '.',
//     showLabels: true,
//     showTitle: true,
//     title: 'My Awesome CSV',
//     useTextFile: false,
//     useBom: true,
//     useKeysAsHeaders: true,
//     // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
// };
//
// const { Parser } = require('json2csv');
// const myCars = [
//     {
//         "car": {"make": "Audi", "model": "A3"},
//         "price": 40000,
//         "color": "blue"
//     }, {
//         "car": {"make": "BMW", "model": "F20"},
//         "price": 35000,
//         "color": "black"
//     }, {
//         "car": {"make": "Porsche", "model": "9PA AF1"},
//         "price": 60000,
//         "color": "green"
//     }
// ];
// const fields = [{
//     label: 'Car Name',
//     value: 'car'
// },{
//     label: 'Price USD',
//     value: 'price'
// }];


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, customeraccountdetail, dataarray;

    [err, customeraccountdetail] = await to(customer_account_detail.findAll({
        order: [['createdAt', 'ASC']],
        include: [{model: field_boy}, {model: customer}]
    }));

    if (err) ReE(res, err, 422)

    let json = [];

    for (let i in customeraccountdetail) {
        let customeraccountdetaildetails = customeraccountdetail[i];
        let customeraccountdetail_info = customeraccountdetaildetails.toWeb();


         dataarray = {
            CustomerName: customeraccountdetail_info.customer.name,
            review_by: null,
            review_status: null,
            paid_by: customeraccountdetail_info.field_boy.name,
            amount: customeraccountdetail_info.amount,
            is_paid: customeraccountdetail_info.is_paid,
            month: customeraccountdetail_info.month,
            year: customeraccountdetail_info.year,
            remarks: customeraccountdetail_info.remarks,
            createdAt: customeraccountdetail_info.createdAt
        };
        json.push(dataarray);
    }
    //csvExporter.generateCsv(data);
    // const json2csvParser = new Parser({ fields, quote: '' });
    // const csv = json2csvParser.parse(myCars);
    // console.log(csv);
    return ReS(res, {customeraccountdetails: json});
};

module.exports.getAll = getAll;