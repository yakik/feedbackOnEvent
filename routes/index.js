var express = require('express')
var router = express.Router()

var referenceSetup = new (require('../referenceSetup'))()
var numberOfSmileyTypes = referenceSetup.numberOfSmileyTypes
var statElementIDPrefix = referenceSetup.statElementIDPrefix
var buttonElementIDPrefix = referenceSetup.buttonElementIDPrefix

var FeedbackManager = require('../appModules/FeedbackManager.js')
var feedbackManager = new FeedbackManager()

/* GET home page. */
router.get('/feedback/:event', function (req, res, next) {
  res.render('feedback', { title: 'Feedback!',
    feedbackID: req.params.event,
    numberOfSmileyTypes: numberOfSmileyTypes,
    buttonElementIDPrefix: buttonElementIDPrefix})
})

router.get('/feedbackButtonPress/:event-:smileyID', function (req, res, next) {

  feedbackManager.addSmileyFeedback(req.params.event, req.params.smileyID)
})

router.get('/createFeedback/:event-:numberOfSmileyTypes', function (req, res, next) {
  res.render('main', { title:'Feedback!'})
  feedback= feedbackManager.createFeedback(req.params.event, req.params.numberOfSmileyTypes)

})

router.get('/stat/:event', function (req, res, next) {
  res.render('stat', { title: 'Feedback!',
    numberOfSmileyTypes: numberOfSmileyTypes,
    statElementIDPrefix: statElementIDPrefix,
    smileysFeedbackCountArrayStats: feedbackManager.getSmileysFeedbackCountArray(req.params.event)
  })
})

module.exports = router
