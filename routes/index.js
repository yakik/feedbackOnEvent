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
    eventID: req.params.event,
    numberOfSmileys: eventManager.getSmileysFeedbackCountArray(req.params.event).length,
    buttonElementIDPrefix: buttonElementIDPrefix})
})

router.post('/feedbackGiven/', function (req, res, next) {
  res.redirect('/feedback/'+req.body.eventName)
  eventManager.addSmileyFeedback(req.body.eventName, req.body.smileyID)
})

router.post('/addEvent', function (req, res, next) {
  res.redirect('/')
  eventManager.createEvent(req.body.NewEventName, req.body.NewEventNumberOfSmileys)

})

router.get('/', function (req, res, next) {
  res.render('main', { title: 'Agile Sparks Events', events: eventManager.getAllEvents()})
})

module.exports = router
