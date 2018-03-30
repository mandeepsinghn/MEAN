var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var fields = '_id username isActive name address latitude longitude startDate endDate createdOn createdBy modifiedOn modifiedBy';
    router.get('/schools\.:ext/:page/:pageSize?', function (req, res) {
        var skip = parseInt(req.params.pageSize * req.params.page);
        var pagination = new Object();
        if(parseInt(req.params.pageSize))
            pagination.limit = parseInt(req.params.pageSize);
        if(skip)
            pagination.skip = skip;
        db.loadModel('School').find({}, fields, pagination, function (err, doc) {
            var data = new Object();
            data.data = doc;
            db.loadModel('School').count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.post('/schools/add\.:ext"?', function (req, res) {
        const schoolModel = db.loadModel('School');
        req.body.school.password = crypto.encrypt(req.body.school.password);
        const newSchool = new schoolModel(req.body.school);
        schoolModel.create(newSchool, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/schools/login\.:ext?', function (req, res) {
        db.loadModel('School').findOne({username:req.body.username, password:crypto.encrypt(req.body.password)},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/schools/view\.:ext/:id?', function (req, res) {
        db.loadModel('School').findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/schools/update\.:ext?', function (req, res) {
        if(typeof  req.body.school.password != 'undefined')
            req.body.school.password = crypto.encrypt(req.body.school.password);
        db.loadModel('School').findByIdAndUpdate(req.body.school._id,req.body.school, function (err, doc) {
        });

        db.loadModel('School').findOne({_id: req.body.school._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/schools/delete\.:ext/:id?', function (req, res) {
        db.loadModel('School').findOne({_id : req.params.id}).remove().exec();
        db.loadModel('School').find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
