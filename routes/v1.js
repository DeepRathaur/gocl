const express                   =   require('express');
const router                    =   express.Router();
const PARAMS                    =   require('../config/globalparam');


const UserController 	        = require('../controllers/user.controller');
const StateController 	        = require('../controllers/state.controller');
const City                      = require('../controllers/city.controller');
const Localities                = require('../controllers/locality.controller');
const HomeTypeController        = require('../controllers/hometype.controller');
const GarbageRate               = require('../controllers/garbagerate.controller');
const NagarNigam                = require('../controllers/nagarnigam.controller');
const NagarNigamOffice          = require('../controllers/nagarnigamoffice.controller');
const FieldBoy                  = require('../controllers/fieldboy.controller');
const Customers                 = require('../controllers/customers.controller');
const Supervisors               = require('../controllers/supervisor.controller');
const UserGpsTracking           = require('../controllers/usergps.controller');
const CustomerAccount           = require('../controllers/customeraccount.controller');
const ReportsController         = require('../controllers/reports.controller');



const passport      	= require('passport');
const allowOnly         = require('../services/routes.helper').allowOnly;

require('./../middleware/passport')(passport);


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Admission Alert Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/users',                   UserController.create);                                                                                                         // C
router.get (    '/users',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, UserController.getAll));                    // R
router.get (    '/users/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.getOne));                    // R
router.put (    '/users',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.update));                    // U
router.delete(  '/users/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, UserController.remove));                    // D
router.post(    '/users/login',              UserController.login);                     // Login

/**
 * @State Controller Routing
 */
router.post(    '/states',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.create));                   // C
router.get(     '/states',                  StateController.getAll);                                                                                                        // R
router.put(     '/states/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.update));                   // U
router.delete(  '/states/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.remove));                   // D

/**
 * @City Controller Routing
 */
router.post(    '/cities',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, City.create));                   // C
router.get(     '/cities',                  City.getAll);                                                                                                        // R
router.get(     '/cities/:id',              City.getOne);                                                                                                        // R
router.put(     '/cities/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, City.update));                   // U
router.delete(  '/cities/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, City.remove));                   // D

/**
 * @Locality Controller Routing
 */
router.post(    '/localities',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Localities.create));                   // C
router.get(     '/localities',                  Localities.getAll);                                                                                                        // R
router.get(     '/localities/:id',              Localities.getOne);  //By city Id                                                                                                       // R
router.put(     '/localities/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Localities.update));                   // U
router.delete(  '/localities/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Localities.remove));                   // D

/**
 * @Home-Type Controller Routing
 */
router.post(    '/hometypes',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, HomeTypeController.create));                   // C
router.get(     '/hometypes',                  HomeTypeController.getAll);                                                                                                        // R
router.put(     '/hometypes/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, HomeTypeController.update));                   // U
router.delete(  '/hometypes/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, HomeTypeController.remove));                   // D

/**
 * @Garbage_Rate Controller Routing
 */
router.post(    '/garbagerate',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, GarbageRate.create));                   // C
router.get(     '/garbagerate',                  GarbageRate.getAll);                                                                                                        // R
router.get(     '/garbagerate/:id',              GarbageRate.getOne);   //by home tye id                                                                                                      // R
router.put(     '/garbagerate/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, GarbageRate.update));                   // U
router.delete(  '/garbagerate/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, GarbageRate.remove));                   // D

/**
 * @NagarNigam Controller Routing
 */
router.post(    '/nagarnigam',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigam.create));                   // C
router.get(     '/nagarnigam',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigam.getAll));                                                                                                        // R
router.get(     '/nagarnigam/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigam.getOne));  //By city Id                                                                                                       // R
router.put(     '/nagarnigam/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigam.update));                   // U
router.delete(  '/nagarnigam/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigam.remove));                   // D

/**
 * @NagarNigam Controller Routing
 */
router.post(    '/nagarnigamoffices',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigamOffice.create));                   // C
router.get(     '/nagarnigamoffices',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigamOffice.getAll));                                                                                                        // R
router.get(     '/nagarnigamoffices/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigamOffice.getOne));  //By city Id                                                                                                       // R
router.put(     '/nagarnigamoffices/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigamOffice.update));                   // U
router.delete(  '/nagarnigamoffices/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, NagarNigamOffice.remove));                   // D

/**
 * @FieldBoy Controller Routing
 */
router.post(    '/fieldboys',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, FieldBoy.create));                   // C
router.get(     '/fieldboys',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, FieldBoy.getAll));                                                                                                        // R
router.get(     '/fieldboys/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, FieldBoy.getOne));  //By locality Id                                                                                                       // R
router.put(     '/fieldboys/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, FieldBoy.update));                   // U
router.delete(  '/fieldboys/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, FieldBoy.remove));                   // D

/**
 * @Customers Controller Routing
 */
router.post(    '/customers',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, Customers.create));                   // C
router.get(     '/customers',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, Customers.getAll));                                                                                                        // R
router.get(     '/customersbyfb/:fieldboyid',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, Customers.getByFieldBoy));                                                                                                        // R
router.get(     '/customers/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, Customers.getOne));  // by customer id                                                                                                      // R
router.put(     '/customers/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, Customers.update));                   // U
router.delete(  '/customers/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Customers.remove));                   // D

/**
 * @Supervisors Controller Routing
 */
router.post(    '/supervisors',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Supervisors.create));                   // C
router.get(     '/supervisors',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Supervisors.getAll));                                                                                                        // R
router.get(     '/supervisors/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Supervisors.getOne));  // by locality id                                                                                                      // R
router.put(     '/supervisors/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Supervisors.update));                   // U
router.delete(  '/supervisors/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, Supervisors.remove));                   // D

/**
 * @UserGpsTracking Controller Routing
 */
router.post('/usergpstracking', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, UserGpsTracking.create));    // C
router.get('/usergpstracking', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, UserGpsTracking.getAll));    // R
router.get('/usergpstracking/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, UserGpsTracking.getOne));    // R
router.get('/usergpstracking/:id/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.user, UserGpsTracking.getByDate));    // R
//router.get('/usergpstrackingbyrm/:rmid/:date', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.guest, usergpstracking.getByReporingM));    // R
router.delete('/usergpstracking/:id', passport.authenticate('jwt', {session: false}), allowOnly(PARAMS.accessLevels.admin, UserGpsTracking.remove));    // D

/**
 * @Customers-Account-Details Controller Routing
 */
router.post(    '/customeraccount',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CustomerAccount.create));                   // C
router.get(     '/customeraccount',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CustomerAccount.getAll));                                                                                                        // R
router.get(     '/customeraccount/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CustomerAccount.getOne));   //by fiieldBoyid                                                                                              // R
router.put(     '/customeraccount/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CustomerAccount.update));                   // U
router.delete(  '/customeraccount/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CustomerAccount.remove));                   // D


/**
 * @Customers-Account-Details Controller Routing
 */
router.get(    '/reports',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, ReportsController.getAll));                   // C

module.exports = router;