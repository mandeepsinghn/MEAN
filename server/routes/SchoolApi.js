var loadRoutes = function (db, router, crypto) {
    // Get all posts
    router.get('/schools\.:ext?', function (req, res) {
        db.loadModel('School').find({}, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/schools/add\.:ext?', function (req, res) {
        const schoolModel = db.loadModel('School');
        const newSchool = new schoolModel(req.body.school);

        schoolModel.create(newSchool, function (err, obj) {
            res.status(200).json(doc);
        });
    });
    router.post('/schools/login\.:ext?', function (req, res) {
        db.loadModel('School').findOne({username:req.body.username, password:crypto.encrypt(req.body.password)}, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/schools/view/:id\.:ext?', function (req, res) {
        db.loadModel('School').findOne({_id : req.params._id}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/schools/update\.:ext?', function (req, res) {
        db.loadModel('School').findByIdAndUpdate(req.body.user._id,req.body.user, function (err, doc) {
        });

        db.loadModel('School').findOne({_id: req.body.user._id}, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/schools/delete/:id\.:ext?', function (req, res) {
        db.loadModel('School').delegate({});
        db.loadModel('School').find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
