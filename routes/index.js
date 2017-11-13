var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/feedback', function(req, res, next) {
    res.render('index', { title: 'Feedback!' });
});

router.get('/stat', function(req, res, next) {
    res.render('stat', { title: 'Feedback!' });
});

module.exports = router;
