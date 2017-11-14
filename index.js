var express = require('express')
var router = express.Router()

var referenceSetup = new (require('../referenceSetup'))()
var numberOfFeedbackRungs = referenceSetup.numberOfFeedbackRungs
var statElementIDPrefix = referenceSetup.statElementIDPrefix
var buttonElementIDPrefix = referenceSetup.buttonElementIDPrefix

/* GET home page. */
router.get('/feedback', function (req, res, next) {
  res.render('feedback', { title: 'Feedback!',
    numberOfFeedbackRungs: numberOfFeedbackRungs,
    buttonElementIDPrefix: buttonElementIDPrefix})
})

router.get('/stat', function (req, res, next) {
  res.render('stat', { title: 'Feedback!',
    numberOfFeedbackRungs: numberOfFeedbackRungs,
    statElementIDPrefix: statElementIDPrefix})
})

module.exports = router
