var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var fields = '_id isActive name location mac ip wifiname wifiPassword gatewayUsername gatewayPassword readingDistance createdOn createdBy modifiedOn modifiedBy';
    router.get('/gateways\.:ext/:page/:pageSize?', function (req, res) {
        var skip = parseInt(req.params.pageSize * req.params.page);
        var pagination = new Object();
        if(parseInt(req.params.pageSize))
            pagination.limit = parseInt(req.params.pageSize);
        if(skip)
            pagination.skip = skip;
        db.loadModel('Gateway').find({}, fields, pagination, function (err, doc) {
            var data = new Object();
            data.data = doc;
            db.loadModel('Gateway').count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.post('/gateways/add\.:ext"?', function (req, res) {
        const schoolModel = db.loadModel('Gateway');
        const newGateway = new schoolModel(req.body.gateway);
        gatewayModel.create(newGateway, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/gateways/login\.:ext?', function (req, res) {
        db.loadModel('Gateway').findOne({username:req.body.username, password:crypto.encrypt(req.body.password)},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/gateways/view\.:ext/:id?', function (req, res) {
        db.loadModel('Gateway').findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/gateways/update\.:ext?', function (req, res) {
        db.loadModel('Gateway').findByIdAndUpdate(req.body.gateway._id,req.body.gateway, function (err, doc) {
        });

        db.loadModel('Gateway').findOne({_id: req.body.gateway._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/gateways/delete\.:ext/:id?', function (req, res) {
        db.loadModel('Gateway').findOne({_id : req.params.id}).remove().exec();
        db.loadModel('Gateway').find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
