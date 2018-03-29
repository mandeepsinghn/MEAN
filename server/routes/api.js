'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/MongoConnection');
const crypto=require('../library/Security');
const userApi=require('./UserApi');
const schoolApi=require('./SchoolApi');

/* GET api listing. */
router.get('/', function (req, res) {
    res.send('Hello');
});
userApi.loadRoutes(db,router,crypto);
schoolApi.loadRoutes(db,router,crypto);

module.exports = router;