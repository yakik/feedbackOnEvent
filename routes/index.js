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

router.post('/addEvent', function (req, res, next) {
  res.redirect('/');
  eventManager.createEvent(req.body.NewEventName, req.body.NewEventNumberOfSmileys)

})

router.get('/', function (req, res, next) {
  res.render('main', { title: 'Agile Sparks Events'})
})

module.exports = router
