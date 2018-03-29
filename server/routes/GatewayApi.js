var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var fields = '_id isActive name  location  mac  ip  wifiUsername  wifiPassword  gatewayUsername  gatewayPassword  latitude  longitude  startDate  endDate  createdOn  createdBy  modifiedOn  modifiedBy';
    router.get('/gateways\.:ext?', function (req, res) {
        db.loadModel('Gateway').find({}, fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/gateways/add\.:ext?', function (req, res) {
        const gatewayModel = db.loadModel('Gateway');
        req.body.gateway.password = crypto.encrypt(req.body.gateway.password);
        const newGateway = new gatewayModel(req.body.gateway);
        gatewayModel.create(newGateway, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/gateways/view\.:ext/:id?', function (req, res) {
        db.loadModel('Gateway').findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/gateways/update\.:ext?', function (req, res) {
        req.body.gateway.password = crypto.encrypt(req.body.gateway.password);
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
