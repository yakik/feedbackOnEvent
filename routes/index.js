var express = require('express')
var router = express.Router()

var referenceSetup = new (require('../referenceSetup'))()
var numberOfSmileyTypes = referenceSetup.numberOfSmileyTypes
var statElementIDPrefix = referenceSetup.statElementIDPrefix
var buttonElementIDPrefix = referenceSetup.buttonElementIDPrefix

var EventManager = require('../appModules/EventManager.js')
var eventManager = new EventManager()

/* GET home page. */
router.get('/feedback/:event', function (req, res, next) {
  res.render('feedback', { title: 'Feedback!',
    feedbackID: req.params.event,
    numberOfSmileyTypes: numberOfSmileyTypes,
    buttonElementIDPrefix: buttonElementIDPrefix})
})

router.get('/feedbackButtonPress/:event-:smileyID', function (req, res, next) {

  eventManager.addSmileyFeedback(req.params.event, req.params.smileyID)
})

router.get('/createFeedback/:event-:numberOfSmileyTypes', function (req, res, next) {
  res.render('main', { title:'Feedback!'})
  eventManager.createEvent(req.params.event, req.params.numberOfSmileyTypes)

})

router.get('/', function (req, res, next) {
  res.render('main', { title: 'Feedback!',
    numberOfSmileyTypes: numberOfSmileyTypes,
    statElementIDPrefix: statElementIDPrefix,
    smileysFeedbackCountArrayStats: eventManager.getSmileysFeedbackCountArray(req.params.event)
  })
})

module.exports = router
