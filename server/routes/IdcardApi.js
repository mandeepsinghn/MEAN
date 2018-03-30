var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var fields = '_id isActive mac uuid major minor createdOn createdBy modifiedOn modifiedBy';
    router.get('/idcards\.:ext/:page/:pageSize?', function (req, res) {
        var skip = parseInt(req.params.pageSize * req.params.page);
        var pagination = new Object();
        if(parseInt(req.params.pageSize))
            pagination.limit = parseInt(req.params.pageSize);
        if(skip)
            pagination.skip = skip;
        db.loadModel('Idcard').find({}, fields, pagination, function (err, doc) {
            var data = new Object();
            data.data = doc;
            db.loadModel('Idcard').count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.post('/idcards/add\.:ext"?', function (req, res) {
        const schoolModel = db.loadModel('Idcard');
        const newIdcard = new schoolModel(req.body.idcard);
        idcardModel.create(newIdcard, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/idcards/view\.:ext/:id?', function (req, res) {
        db.loadModel('Idcard').findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/idcards/update\.:ext?', function (req, res) {
        db.loadModel('Idcard').findByIdAndUpdate(req.body.idcard._id,req.body.idcard, function (err, doc) {
        });

        db.loadModel('Idcard').findOne({_id: req.body.idcard._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/idcards/delete\.:ext/:id?', function (req, res) {
        db.loadModel('Idcard').findOne({_id : req.params.id}).remove().exec();
        db.loadModel('Idcard').find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
