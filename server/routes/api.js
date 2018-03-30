'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/MongoConnection');
const crypto=require('../library/Security');
const userApi=require('./UserApi');
const schoolApi=require('./SchoolApi');
const gatewayApi=require('./GatewayApi');
const idcardApi=require('./IdcardApi');

/* GET api listing. */
router.get('/', function (req, res) {
    res.send('Hello');
});
userApi.loadRoutes(db,router,crypto);
schoolApi.loadRoutes(db,router,crypto);
gatewayApi.loadRoutes(db,router,crypto);
idcardApi.loadRoutes(db,router,crypto);

module.exports = router;