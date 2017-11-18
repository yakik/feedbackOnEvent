var express = require('express')
var router = express.Router()

var referenceSetup = new (require('../referenceSetup'))()
var numberOfSmileyTypes = referenceSetup.numberOfSmileyTypes
var statElementIDPrefix = referenceSetup.statElementIDPrefix
var buttonElementIDPrefix = referenceSetup.buttonElementIDPrefix

/* GET home page. */
router.get('/feedback', function (req, res, next) {
  res.render('feedback', { title: 'Feedback!',
    numberOfSmileyTypes: numberOfSmileyTypes,
    buttonElementIDPrefix: buttonElementIDPrefix})
})

router.get('/stat', function (req, res, next) {
  res.render('stat', { title: 'Feedback!',
    numberOfSmileyTypes: numberOfSmileyTypes,
    statElementIDPrefix: statElementIDPrefix})
})

module.exports = router
