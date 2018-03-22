var loadRoutes=function (db,router,crypto) {
    // Get all posts
    router.get('/users\.:ext?', function (req, res) {
        db.loadModel('UserInfo');
        db.loadModel('User').find({},function (err,doc) {
            res.status(200).json(doc);
        }).populate('userInfo')
            .exec().then(function (doc) {
        })
    });
    router.get('/users/add\.:ext?', function (req, res) {
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

    router.get('/users/view/:id\.:ext?', function (req, res) {
        db.loadModel('UserInfo');
        db.loadModel('User').findOne({},function (err,doc) {
            res.status(200).json(doc);
        }).populate('userInfo')
            .exec().then(function (doc) {
        })
    });
    router.get('/users/edit/:id\.:ext?', function (req, res) {
        db.loadModel('UserInfo');
        db.loadModel('User').findOne({},function (err,doc) {
            res.status(200).json(doc);
        }).populate('userInfo')
            .exec().then(function (doc) {
        })
    });
    router.get('/users/delete/:id\.:ext?', function (req, res) {
        db.loadModel('UserInfo');
        db.loadModel('User').delegate({})
        db.loadModel('User').find({},function (err,doc) {
            res.status(200).json(doc);
        }).populate('userInfo')
            .exec().then(function (doc) {
        })
    });
}
module.exports.loadRoutes=loadRoutes;