var env = require('dotenv').config({path: __dirname + '/../.env'});//instatiate environment variables

let PRAMAS = {} ;//Make this global to use all over the application

PRAMAS.app          = process.env.APP   || 'dev';
PRAMAS.port         = process.env.PORT  || '3000';
PRAMAS.baseurl      = process.env.BASEURL   ||  'http://192.168.9.99:8000';

PRAMAS.db_dialect   = process.env.DB_DIALECT    || 'mysql';
PRAMAS.db_host      = process.env.DB_HOST       || 'localhost';
PRAMAS.db_port      = process.env.DB_PORT       || '3306';
PRAMAS.db_name      = process.env.DB_NAME       || 'garbagecollector';
PRAMAS.db_user      = process.env.DB_USER       || 'root';
PRAMAS.db_password  = process.env.DB_PASSWORD   || '';

PRAMAS.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
PRAMAS.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';


var userRoles = PRAMAS.userRoles = {
    guest: 1,                   // ...001
    user: 2,                    // ...010
    supervisor: 4,              // ...100
    officelogin: 8,             // ...1000
    nagarniganlogin: 16,        // ...10000
    admin: 32                   // ...100000
};

PRAMAS.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.officelogin | userRoles.nagarniganlogin | userRoles.admin,    // ...111111
    user:  userRoles.user | userRoles.officelogin | userRoles.nagarniganlogin | userRoles.admin,                      // ...111110
    officelogin:  userRoles.officelogin | userRoles.nagarniganlogin | userRoles.admin, // ...11110
    nagarniganlogin:  userRoles.nagarniganlogin | userRoles.admin, // ...1110
    admin: userRoles.admin                                        // ...100000
};


module.exports = PRAMAS;