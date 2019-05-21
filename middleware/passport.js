const { ExtractJwt, Strategy } = require('passport-jwt');
const { user }      = require('../models');
const PARAMS            = require('../config/globalparam');
const {to}          = require('../services/util.service');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = PARAMS.jwt_encryption;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, users;
        [err, users] = await to(user.findOne({
            where:{
                id: jwt_payload.user_id
            }
        }));

        if(err) return done(err, false);
        if(users) {
            return done(null, users);
        }else{
            return done(null, false);
        }
    }));
};