var express = require('express')
var router = express.Router()

var ReferenceSetup = require('../referenceSetup')
var referenceSetup = new ReferenceSetup()
var referenceNumberOfFeedbackRungs = referenceSetup.numberOfFeedbackRungs
var referenceStatElementIDPrefix = referenceSetup.statElementIDPrefix
var referenceButtonElementIDPrefix = referenceSetup.buttonElementIDPrefix

/* GET home page. */
router.get('/feedback', function (req, res, next) {
  res.render('feedback', { title: 'Feedback!',
    numberOfFeedbackRungs: referenceNumberOfFeedbackRungs,
    buttonElementIDPrefix: referenceButtonElementIDPrefix})
})

router.get('/stat', function (req, res, next) {
  res.render('stat', { title: 'Feedback!',
    numberOfFeedbackRungs: referenceNumberOfFeedbackRungs,
    statElementIDPrefix: referenceStatElementIDPrefix})
})

module.exports = router
