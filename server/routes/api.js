'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/MongoConnection');
const crypto=require('../library/Security');

/* GET api listing. */
router.get('/', function (req, res) {
    res.send('Hello');
});

// Get all posts
router.get('/posts\.:ext?', function (req, res) {
    db.loadModel('UserInfo');
    db.loadModel('User').find({},function (err,doc) {
        res.status(200).json(doc);
    }).populate('userInfo')
        .exec().then(function (doc) {
    })
});
router.get('/posts/add\.:ext?', function (req, res) {
    var userModel = db.loadModel('User');
    var userInfoModel = db.loadModel('UserInfo');
    const newUser = new userModel({
        username: 'mandeepsinghn',
        password: crypto.encrypt('mastertrack'),
        isActive: true
    });
    const userInfo = new userInfoModel({
        firstName: 'Mandeep',
        lastName: 'Nain',
        middleName: 'Singh'
    });
    userModel.create(newUser, function (err, obj) {
        userInfo.user = obj._id;
        userInfoModel.create(userInfo, function (err, info) {
            obj.userInfo = info._id;
            obj.save(function (err) {
                res.status(200).json({
                    status: 'success'
                });
            });
        });

    });
});
module.exports = router;